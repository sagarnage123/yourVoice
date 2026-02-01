import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { QueryRow } from "@/components/inbox/QueryRow";
import { studentQueriesService } from "@/api/services/studentQueries.service";
import type { StudentQuery } from "@/types/query";

export function StudentInbox() {
    const navigate = useNavigate();
    const [queries, setQueries] = useState<StudentQuery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadQueries() {
            const data = await studentQueriesService.getAll();
            setQueries(data);
            setLoading(false);
        }

        loadQueries();
    }, []);

    return (
        <div className="page-enter mx-auto max-w-3xl space-y-3">

            <div className="flex items-center justify-between">
                <h1 className="text-base font-medium text-text-secondary">
                    Your conversations
                </h1>

                <button
                    onClick={() => navigate("/student/new-query")}
                    className="
        group
        rounded-full
        px-4 py-2.5
        text-sm font-medium
        text-indigo-600
        bg-indigo-100
        hover:bg-indigo-200
        active:scale-95
        transition-all duration-200 ease-out
        flex items-center gap-1.5
    "
                >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        +
                    </span>
                    New Query
                </button>
            </div>

            <div className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-hide">

                {loading ? (
                    <div className="p-6 text-sm text-text-muted">
                        Loading your conversations…
                    </div>
                ) : queries.length === 0 ? (
                    <div className="p-6 text-sm text-text-muted">
                        You haven’t started a conversation yet.
                    </div>
                ) : (
                    queries.map((query) => (
                        <QueryRow
                            key={query.queryId}
                            query={query}
                            onClick={() =>
                                navigate(`/student/inbox/${query.queryId}`)
                            }
                        />
                    ))
                )}
            </div>
        </div>
    );
}
