"use client";

import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Send } from "lucide-react";

export function Chat() {
  return (
    <div className="flex h-full flex-col p-4">
      <ChatMessageList>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
        <ChatBubble variant="sent">
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleMessage className="bg-card" isLoading />
        </ChatBubble>
      </ChatMessageList>
      <form className="relative">
        <ChatInput className="w-full pr-12" />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2"
          type="submit"
          size="icon"
        >
          <Send className="" />
        </Button>
      </form>
    </div>
  );
}
