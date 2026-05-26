import type { ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";

interface ChatTimelineProps {
    messages: ChatMessage[];
    queryId: string;
    query: ChatMessage | null;
}

export function ChatTimeline({ messages, queryId, query }: ChatTimelineProps) {
    return (
        <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3 px-1 sm:px-2 py-3 sm:py-4">
            {query && <MessageBubble key={queryId} message={query.content} sender={"student"} timestamp={new Date(query.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })} />}
            {messages.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    message={msg.content}
                    sender={msg.sender}
                    timestamp={new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                />
            ))}
        </div>
    );
}
