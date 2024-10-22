"use client";

import dynamic from "next/dynamic";
import { InterfaceSidebar } from "./interface";
import { Skeleton } from "@/components/ui/skeleton";

const Chat = dynamic(() => import("./chat").then((mod) => mod.Chat), {
  loading: () => (
    <Skeleton className="m-4 flex h-[100px] w-[200px] flex-col gap-2 rounded-r-lg rounded-bl-none rounded-tl-lg bg-card p-4">
      <Skeleton className="h-[1em] w-3/4" />
      <Skeleton className="h-[1em]" />
      <Skeleton className="h-[1em] w-1/2" />
    </Skeleton>
  ),
});

export function ChatSidebar({ initialMessage }: { initialMessage?: string }) {
  return (
    <InterfaceSidebar>
      {() => <Chat initialMessage={initialMessage} />}
    </InterfaceSidebar>
  );
}
