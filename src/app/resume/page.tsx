import { getPrompt } from "@/lib/prompts";
import { Chat } from "./chat";
import {
  Interface,
  InterfaceContent,
  InterfaceSidebar,
  InterfaceToolbar,
} from "./interface";
import { Resume } from "./resume";
import { ToolbarControls } from "./toolbar-controls";

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
        <InterfaceSidebar>
          <Chat initialMessage={prompt?.prompt} />
        </InterfaceSidebar>
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
