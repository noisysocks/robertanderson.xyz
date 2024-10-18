"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle, Printer } from "lucide-react";
import { useInterface } from "./interface";

export function ToolbarControls() {
  const { toggleSidebar } = useInterface();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <MessageCircle />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open chat</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="ml-auto"
            variant="outline"
            size="icon"
            onClick={() => window.print()}
          >
            <Printer />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Print</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
