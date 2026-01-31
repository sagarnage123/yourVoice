import { useEffect, useState } from "react";
import {
    publicQueriesService,
    PublicQuery,
} from "@/api/services/publicQueries.service";

export function PublicQueriesStaff() {
    const [queries, setQueries] = useState<PublicQuery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicQueriesService
            .getAll()
            .then((res) => setQueries(res.queries))
            .finally(() => setLoading(false));
    }, []);

    async function toggleAgree(q: PublicQuery) {
        setQueries((prev) =>
            prev.map((item) =>
                item.id === q.id
                    ? {
                        ...item,
                        hasAgreed: !item.hasAgreed,
                        likes: item.hasAgreed
                            ? item.likes - 1
                            : item.likes + 1,
                    }
                    : item
            )
        );

        try {
            if (q.hasAgreed) {
                await publicQueriesService.unlike(q.id);
            } else {
                await publicQueriesService.like(q.id);
            }
        } catch {
            
        }
    }

    return (
        <div className="page-enter mx-auto max-w-3xl space-y-6">
            <h1 className="text-lg font-semibold text-text-secondary">
                Public Questions
            </h1>

            {loading ? (
                <div className="p-6 text-sm text-text-muted">
                    Loading public feed…
                </div>
            ) : (
                    <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-hide space-y-4">
                    {queries.map((q) => (
                        <div
                            key={q.id}
                            className="
                rounded-xl
                border border-slate-200
                bg-bg-surface
                p-5
                space-y-3
                transition-all duration-200 ease-out
                hover:scale-[1.01]
                hover:border-indigo-300
                hover:bg-indigo-50/40
                hover:shadow-lg
              "
                        >
                            <p className="text-sm leading-relaxed text-text-primary">
                                {q.content}
                            </p>

                            <div className="flex items-center justify-between text-xs text-text-muted">
                                <button
                                    onClick={() => toggleAgree(q)}
                                    className="
                    group inline-flex items-center gap-1.5
                    transition-colors
                    hover:text-indigo-600
                  "
                                >
                                    <span
                                        className={`text-base transition-transform group-active:scale-90 ${q.hasAgreed ? "text-indigo-600" : ""
                                            }`}
                                    >
                                        ♥
                                    </span>
                                    {q.likes}
                                </button>

                                <span>
                                    {new Date(q.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
