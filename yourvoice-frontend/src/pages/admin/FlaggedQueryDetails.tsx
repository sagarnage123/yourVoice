import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {
    adminOverrideService,
    AdminFlaggedQueryOverride,
} from "@/api/services/adminOverride.service";

export function FlaggedQueryDetails() {
    const { queryId } = useParams<{ queryId: string }>();
    const [data, setData] =
        useState<AdminFlaggedQueryOverride | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (!queryId) return;

        adminOverrideService
            .getFlaggedQuery(queryId)
            .then(setData)
            .catch(() =>
                toast.error("Failed to load flagged query")
            )
            .finally(() => setLoading(false));
    }, [queryId]);

    if (loading) {
        return (
            <div className="p-6 text-sm text-text-muted">
                Loading flagged query…
            </div>
        );
    }

    if (!data) return null;

    const { query, student } = data;

    return (
        <div className="page-enter mx-auto max-w-3xl space-y-6">
            <button
                onClick={() => navigate("/admin/flagged-queries")}
                className="
        inline-flex items-center gap-1.5
        text-xs font-medium
        text-indigo-600
        hover:text-indigo-700
        transition-colors
    "
            >
                <span className="text-sm">←</span>
                Back to flagged queries
            </button>

            <div
                className="
        rounded-xl
        border border-slate-200
        bg-bg-surface
        p-6
        space-y-5
        shadow-sm
        transition-all duration-200 ease-out
        hover:scale-[1.01]
        hover:border-indigo-300
        hover:bg-indigo-50/40
        hover:shadow-lg
    "
            >


                <h1 className="text-sm font-medium text-text-secondary">
                    Flagged Query Details
                </h1>

                <div className="space-y-4 text-sm">

                    <div>
                        <span className="text-xs text-text-muted uppercase tracking-wide">
                            Flag reason
                        </span>

                        <div className="font-medium">
                            {query.flagReason || "—"}
                        </div>
                    </div>

                    <div>
                        <span className="text-xs text-text-muted uppercase tracking-wide">
                            Student identifier
                        </span>

                        <div className="font-medium">
                            {student.email || student.phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
