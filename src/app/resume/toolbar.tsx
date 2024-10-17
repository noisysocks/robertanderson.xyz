"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Braces, Code, Download, MessageCircle } from "lucide-react";
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
        "md:bg-transparent fixed bottom-0 left-0 right-0 z-10 flex gap-1 bg-card/75 p-4 backdrop-blur transition-opacity md:bottom-auto md:top-0 md:backdrop-blur-none print:hidden",
        {
          "md:opacity-0": !isVisible,
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
            <Button variant="outline" size="icon">
              <Code />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View source</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Braces />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download JSON</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download PDF</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
