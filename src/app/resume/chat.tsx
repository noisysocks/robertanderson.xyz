"use client";

import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Send } from "lucide-react";

export function Chat() {
  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      id: "resume",
      initialMessages: [
        {
          id: "initial-1",
          content:
            "Hi! I'm Robert's digital friend.\n\nTake a look at his resume on the right and ask me any questions you have.",
          role: "assistant",
        },
      ],
      maxSteps: 3,
    });

  return (
    <div className="flex h-full flex-col p-4">
      <ChatMessageList>
        {messages.map((message) => {
          const variant = message.role == "user" ? "sent" : "received";
          return (
            <ChatBubble key={message.id} variant={variant}>
              <ChatBubbleMessage
                className={cn({
                  "bg-card": variant === "received",
                })}
                variant={variant}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
        {isLoading && (
          <ChatBubble variant="received">
            <ChatBubbleMessage className="bg-card" isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>
      <form className="relative" onSubmit={handleSubmit}>
        <ChatInput
          className="w-full pr-12"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(event);
            }
          }}
        />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2"
          type="submit"
          size="icon"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
