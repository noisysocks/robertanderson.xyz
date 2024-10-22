import { getPrompt } from "@/lib/prompts";
import { Interface, InterfaceContent, InterfaceToolbar } from "./interface";
import { Resume } from "./resume";
import { ToolbarControls } from "./toolbar-controls";
import { ChatSidebar } from "./chat-sidebar";

export default async function ResumePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { chat } = searchParams;
  const prompt = typeof chat === "string" ? await getPrompt(chat) : undefined;
  return (
    <div>
      <Interface sidebarOpen={!!chat}>
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
