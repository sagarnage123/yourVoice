import { useParams } from "react-router-dom";
import { ChatTimelineStaff } from "@/components/chat/ChatTimlineStaff";
import { MessageComposer } from "@/components/chat/MessageComposer";
import { staffQueriesService } from "@/api/services/staffQueries.service";
import { useQueryThread } from "@/hook/useQueryThread";
import { useState } from "react";
import toast from "react-hot-toast";

export function StaffConversation() {
    const { queryId } = useParams<{ queryId: string }>();
    const [flagged, setFlagged] = useState(false);


    if (!queryId) {
        return null;
    }

    const { messages, loading, setMessages, query } = useQueryThread(queryId);

    async function handleFlag() {
        if (!queryId) return;

        const reason = window.prompt(
            "Please describe why you are flagging this conversation:"
        );
        
        if (!reason || !reason.trim() || reason.trim().length<10) {
            return;
        }

        try {
            await staffQueriesService.flagQuery(queryId,
                reason.trim());
            setFlagged(true);
            toast.success("Conversation flagged for review");
        } catch {
            toast.error("Conversation flagged already");
        }
    }



    async function handleSend(content: string) {
        
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                sender: "staff",
                content,
                createdAt: new Date().toISOString(),
            },
        ]);

        await staffQueriesService.sendReply(queryId!, content);
    }

    return (
        <div className="flex h-[calc(100vh-180px)] flex-col rounded-xl border border-slate-200 bg-bg-surface shadow-card">

            <div className="flex items-center justify-end px-3 py-2">
                <button
                    onClick={handleFlag}
                    disabled={flagged}
                    className="
            rounded-md px-3 py-1.5
            text-xs font-medium
            border
            text-rose-600 border-rose-200
            hover:bg-rose-50
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
        "
                >
                    {flagged ? "Flagged" : "Flag conversation"}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
                {loading ? (
                    <div className="flex h-full items-center justify-center text-sm text-text-muted">
                        Loading conversation…
                    </div>
                ) : (
                    <ChatTimelineStaff
                        messages={messages}
                        queryId={queryId}
                        query={query}
                    />
                )}
            </div>

            <div className="border-t border-slate-200/70 bg-bg-surface">
                <MessageComposer onSend={handleSend} />
            </div>

        </div>
    );

}
