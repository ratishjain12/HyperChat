"use client";
import React from "react";
import { Message, useChat } from "ai/react";
import { Input } from "./ui/input";
import { Bot, SendIcon } from "lucide-react";
import { Messages } from "./Messages";
const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: "/api/chat-stream",
    initialMessages,
    body: { sessionId },
  });
  return (
    <div className="flex bg-zinc-900 divide-y divide-zinc-700 flex-col justify-between min-h-screen">
      <div className="flex flex-1 flex-col ">
        <Messages messages={messages} />
      </div>
      <div className="px-4 md:px-8 lg:px-12  pb-4">
        <form
          onSubmit={handleSubmit}
          className=" flex gap-4 items-center relative mt-4"
        >
          <Bot className="text-white" />
          <Input
            onChange={handleInputChange}
            value={input}
            placeholder="Message HyperChat..."
          />
          <button>
            <SendIcon className="absolute right-8 top-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWrapper;
