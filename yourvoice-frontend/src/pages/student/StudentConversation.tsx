import { useParams } from "react-router-dom";
import { ChatTimeline } from "@/components/chat/ChatTimeline";
import { MessageComposer } from "@/components/chat/MessageComposer";
import { queryChatService } from "@/api/services/queryChat.service";
import { useQueryThread } from "@/hook/useQueryThread";
import { useState } from "react";
import toast from "react-hot-toast";
import { studentQueriesService } from "@/api/services/studentQueries.service";
import { RateStaffCard } from "@/components/ratings/RateStaffCard";
export function StudentConversation() {
    const { queryId } = useParams<{ queryId: string }>();

    if (!queryId) {
        return null;
    }

    const { messages, loading, setMessages, query } = useQueryThread(queryId);
    const [showRating, setShowRating] = useState(true);


    async function handleSend(content: string) {
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                sender: "student",
                content,
                createdAt: new Date().toISOString(),
            },
        ]);

        await queryChatService.sendMessage(queryId!, content);
    }
    async function handleRate(value: number) {
        try {
            await studentQueriesService.rateQuery(queryId!, value);
            toast.success("Thanks for your feedback!");
            setShowRating(false); 
        } catch {
            setShowRating(false); 
            toast.error("You already rated this query");
        }
    }


    return (
        <div className="page-enter flex h-[calc(100vh-180px)] flex-col rounded-xl bg-bg-surface border border-slate-200 shadow-sm">
           
            <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">

                {loading ? (
                    <div className="flex h-full items-center justify-center text-sm text-text-muted">
                        Loading conversation…
                    </div>
                ) : (
                    <ChatTimeline
                        messages={messages}
                        queryId={queryId}
                        query={query}
                    />
                )}
            </div>

            
            <div className="border-t border-slate-200/70 bg-bg-surface">
                <MessageComposer onSend={handleSend} />
            </div>

            {showRating && (
                <div className="border-t border-slate-200 bg-bg-surface px-3 py-4">
                    <RateStaffCard onRate={handleRate} />
                </div>
            )}

        </div>
    );
}
