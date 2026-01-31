import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface MessageComposerProps {
    onSend: (message: string) => Promise<void>;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSend() {
        if (!message.trim()) return;

        try {
            setSending(true);
            await onSend(message);
            setMessage("");
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="flex items-center gap-2 border-t border-slate-200 bg-bg-surface p-3">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message…"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                disabled={sending}
            />
            <Button loading={sending} onClick={handleSend}>
                Send
            </Button>
        </div>
    );
}
