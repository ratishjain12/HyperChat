import ChatWrapper from "@/components/ChatWrapper";
import { ragChat } from "@/util/rag-chat";
import { redis } from "@/util/redis";
import { cookies } from "next/headers";
import React from "react";

function decodedString(components: string[]): string {
  if (components.length < 2) {
    throw new Error(
      "Invalid URL components: Must have at least a protocol and host"
    );
  }

  const [protocol, host, ...pathParts] = components.map((part) =>
    decodeURIComponent(part)
  );

  // Ensure the protocol ends with ":" for proper URL format
  const formattedProtocol = protocol.endsWith(":") ? protocol : `${protocol}:`;

  // Construct the URL
  const url = `${formattedProtocol}//${host}/${pathParts.join("/")}`;

  return url;
}

const page = async ({ params }: { params: { url: string[] } }) => {
  const sessionCookie = cookies().get("sessionId")?.value;
  const decodedUrl = decodedString(params.url);

  const sessionId = (decodedUrl + "--" + sessionCookie).replace(/\//g, "_");

  const isIndexed = await redis.sismember("indexed_urls", decodedUrl);

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId: sessionId,
  });
  if (!isIndexed) {
    await ragChat.context.add({
      type: "html",
      source: decodedUrl,
    });

    redis.sadd("indexed_urls", decodedUrl);
  }

  return (
    <div>
      <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
    </div>
  );
};

export default page;
