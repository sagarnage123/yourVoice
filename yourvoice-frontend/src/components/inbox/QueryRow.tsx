import { cn } from "@/utils/cn";
import type { StudentQuery } from "@/types/query";

interface QueryRowProps {
    query: StudentQuery;
    onClick: () => void;
}

export function QueryRow({ query, onClick }: QueryRowProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left",
                "hover:border-slate-300 hover:bg-slate-50 transition"
            )}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand-primary">
                S
            </div>
            {query.isFlagged && (
                <span
                    className="
            ml-2 inline-flex items-center
            rounded-full px-2 py-0.5
            text-xs font-medium
            bg-rose-50 text-rose-600
        "
                >
                    Flagged
                </span>
            )}


            <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-text-primary">
                        {query.subject ?? "Anonymous query"}
                    </p>
                    <span className="shrink-0 text-xs text-text-muted">
                        {new Date(query.lastMessageAt).toLocaleDateString()}
                    </span>
                </div>

                <p className="truncate text-sm text-text-secondary">
                    {query.lastMessage ?? query.content ?? "No messages yet."}
                </p>
            </div>

            {query.unreadCount ? (
                <span className="ml-2 min-w-4.5 rounded-full bg-brand-primary px-1.5 py-0.5 text-center text-xs font-medium text-white">
                    {query.unreadCount}
                </span>
            ) : null}
        </button>
    );
}
