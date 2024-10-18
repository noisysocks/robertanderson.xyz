import {
  Interface,
  InterfaceContent,
  InterfaceSidebar,
  InterfaceToolbar,
} from "./interface";
import { Resume } from "./resume";
import { ToolbarControls } from "./toolbar-controls";

export default function ResumePage() {
  return (
    <div>
      <Interface>
        <InterfaceSidebar>chat goes here</InterfaceSidebar>
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
