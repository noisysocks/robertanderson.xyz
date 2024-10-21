import { searchDocuments } from "@/lib/documents";
import { ResumeSchema } from "@/types/resume-schema";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, tool } from "ai";
import fs from "fs";
import yaml from "js-yaml";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    system: `
      You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
      `,
    messages: convertToCoreMessages(messages),
    tools: {
      getResume: tool({
        description: "get the resume of Robert Anderson.",
        parameters: z.object({}),
        execute: async () => {
          return yaml.load(
            fs.readFileSync("./src/data/resume/resume.yaml", "utf8"),
          ) as ResumeSchema;
        },
      }),
      getInformation: tool({
        description:
          "get information from your knowledge base to answer questions.",
        parameters: z.object({
          query: z.string().describe("the users question"),
        }),
        execute: async ({ query }) => await searchDocuments(query),
      }),
    },
  });

  return result.toDataStreamResponse();
}
