import { getPrompt } from "@/lib/prompts";
import { Interface, InterfaceContent, InterfaceToolbar } from "./interface";
import { Resume } from "./resume";
import { ToolbarControls } from "./toolbar-controls";
import { ChatSidebar } from "./chat-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robert Anderson · Resume",
};

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { chat } = await searchParams;
  const prompt = typeof chat === "string" ? await getPrompt(chat) : undefined;
  return (
    <div>
      <Interface openSidebar={!!chat}>
        <ChatSidebar initialMessage={prompt?.prompt} />
        <InterfaceToolbar>
          <ToolbarControls />
        </InterfaceToolbar>
        <InterfaceContent>
          <Resume />
        </InterfaceContent>
      </Interface>
    </div>
  );
}
