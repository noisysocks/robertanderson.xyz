import { getAllDocuments } from "@/lib/documents";
import { getResume } from "@/lib/resume";
import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const resume = getResume();
  const documents = await getAllDocuments();

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    system: `
      You are a "digital friend" of Robert Anderson.
      Answer questions using only the resume and what Robert has told you below.
      If nothing is relevant to the question, ask the user to email Robert Anderson.
      Answer minimally. Be sincere, not serious.

      Resume:

      ${JSON.stringify(resume, null, 2)}

      What Robert has told you:

      ${documents.map((document) => document.content).join("\n\n")}
    `,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
