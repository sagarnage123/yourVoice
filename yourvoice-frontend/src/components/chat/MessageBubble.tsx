
import { cn } from "@/utils/cn";

interface MessageBubbleProps {
    message: string;
    sender: "student" | "staff";
    timestamp: string;
}

export function MessageBubble({
    message,
    sender,
    timestamp,
}: MessageBubbleProps) {
    const isStudent = sender === "student";

    return (
        <div
            className={cn(
                "flex w-full",
                isStudent ? "justify-end" : "justify-start",
                "transition-colors duration-200"
            )}
        >
            <div
                className={cn(
                    "max-w-[88%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2.5 text-sm leading-relaxed",
                    isStudent
                        ? "bg-indigo-50 border border-indigo-100 text-text-primary rounded-br-sm"
                        : "bg-slate-100 border border-slate-200 text-text-primary rounded-bl-sm"
                )}
            >
                <p className="wrap-break-words whitespace-pre-wrap">
                    {message}
                </p>
                <span
                    className={cn(
                        "mt-1.5 block text-[10px] text-text-muted",
                        isStudent ? "text-right" : "text-left"
                    )}
                >
                    {timestamp}
                </span>
            </div>
        </div>
    );
}
