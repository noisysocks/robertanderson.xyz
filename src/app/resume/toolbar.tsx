"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MessageCircle, Printer } from "lucide-react";
import { useEffect, useState } from "react";

export function Toolbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsVisible(false), 3000);
    };

    const handleScroll = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    timeoutId = setTimeout(() => setIsVisible(false), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-10 flex gap-1 border-b bg-card/75 p-4 backdrop-blur transition-opacity lg:bg-transparent lg:backdrop-blur-none print:hidden",
        {
          "lg:opacity-0": !isVisible,
        },
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <MessageCircle />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open chat</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex-grow" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
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
    </div>
  );
}
