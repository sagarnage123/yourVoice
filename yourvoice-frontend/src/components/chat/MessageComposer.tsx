import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface MessageComposerProps {
    onSend: (message: string) => Promise<void>;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    async function handleSend() {
        if (!message.trim()) return;

        try {
            setSending(true);
            await onSend(message.trim());
            setMessage("");
        } finally {
            setSending(false);
        }
    }


    return (
        <div className="flex items-end gap-2 border-t border-slate-200 bg-bg-surface p-2 sm:p-3">
            <textarea
                rows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message…"
                className="flex-1 resize-none rounded-2xl border border-slate-200
px-4 py-2.5 text-sm
leading-relaxed
min-h-11
max-h-32
overflow-y-auto
focus:outline-none
focus:ring-2 focus:ring-blue-200
disabled:cursor-not-allowed disabled:opacity-50"
                disabled={sending}
                onKeyDown={handleKeyDown}
            />
            <Button 
                className="shrink-0 self-end"
            loading={sending} onClick={handleSend}>
                Send
            </Button>
        </div>
    );
}
