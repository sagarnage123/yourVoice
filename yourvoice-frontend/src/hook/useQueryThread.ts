import { useEffect, useRef, useState } from "react";
import type { ChatMessage,QueryChatServiceGetData } from "@/types/chat";
import { queryChatService } from "@/api/services/queryChat.service";

const POLL_INTERVAL = 5000;

export function useQueryThread(queryId: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [query, setQuery] = useState<ChatMessage | null>(null);
    const [loading, setLoading] = useState(true);

    const lastMessageIdRef = useRef<string | null>(null);

    async function fetchThread() {
        const res = await queryChatService.getMessages(queryId);
        const data = res.messages;
        const query = res.query;

        setQuery(query && {
            id: query.id,
            sender: "student",
            content: query.content,
            createdAt: query.createdAt,
        });

        

        if (
            data.length &&
            data[data.length - 1].id !== lastMessageIdRef.current
        ) {
            lastMessageIdRef.current = data[data.length - 1].id;
            setMessages(data);
        }

        if (loading) setLoading(false);
    }

    useEffect(() => {
        fetchThread();

        const interval = setInterval(fetchThread, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [queryId]);

    return { messages, loading, setMessages, query };
}
