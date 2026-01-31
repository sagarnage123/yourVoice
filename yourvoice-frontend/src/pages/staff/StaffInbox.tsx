import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { QueryRow } from "@/components/inbox/QueryRow";
import { staffQueriesService } from "@/api/services/staffQueries.service";
import type { StudentQuery } from "@/types/query";

export function StaffInbox() {
    const navigate = useNavigate();
    const [queries, setQueries] = useState<StudentQuery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadQueries() {
            const data = await staffQueriesService.getAll();
            setQueries(data);
            setLoading(false);
        }

        loadQueries();
    }, []);

    return (
        <div className="page-enter mx-auto max-w-3xl space-y-3">
           
            <div className="space-y-1">
                <h1 className="text-base font-medium text-text-secondary">
                    Assigned conversations
                </h1>
                <p className="text-sm text-text-muted">
                    Student queries awaiting your response
                </p>
            </div>

            <div className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-hide">
                {loading ? (
                    <div className="p-6 text-sm text-text-muted">
                        Loading conversations…
                    </div>
                ) : queries.length === 0 ? (
                    <div className="p-6 text-sm text-text-muted">
                        No conversations assigned yet.
                    </div>
                ) : (
                    queries.map((query) => (
                        <QueryRow
                            key={query.queryId}
                            query={query}
                            onClick={() =>
                                navigate(`/staff/inbox/${query.queryId}`)
                            }
                        />
                    ))
                )}
            </div>
        </div>
    );

}
