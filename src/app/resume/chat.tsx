"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { AlertCircle, Send } from "lucide-react";

export function Chat({ initialMessage }: { initialMessage?: string }) {
  const {
    messages,
    isLoading,
    input,
    handleInputChange,
    handleSubmit,
    error,
    reload,
  } = useChat({
    id: "resume",
    initialMessages: [
      {
        id: "initial",
        content:
          initialMessage ??
          "Hi! I'm Robert's digital friend.\n\nTake a look at his resume on the right and ask me any questions you have.",
        role: "assistant",
      },
    ],
    keepLastMessageOnError: true,
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
      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Uh oh</AlertTitle>
          <AlertDescription className="flex flex-col">
            An unexpected error occurred while sending your message.
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-min"
              onClick={() => reload()}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}
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
