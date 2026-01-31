
import { cn } from "@/utils/cn";

interface MessageBubbleProps {
    message: string;
    sender: "student" | "staff";
    timestamp: string;
}

export function MessageBubbleStaff({
    message,
    sender,
    timestamp,
}: MessageBubbleProps) {
    const isStaff = sender === "staff";

    return (
        <div
            className={cn(
                "flex w-full",
                isStaff ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                    isStaff
                        ? "bg-indigo-50 text-text-primary rounded-br-sm"
                        : "bg-slate-100 text-text-primary rounded-bl-sm"
                )}
            >
                <p>{message}</p>
                <span
                    className={cn(
                        "mt-1 block text-[10px] text-text-muted",
                        isStaff ? "text-right" : "text-left"
                    )}
                >
                    {timestamp}
                </ span>
            </div>
        </div>
    );
}
