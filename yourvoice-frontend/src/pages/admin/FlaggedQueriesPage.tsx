import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    adminOverrideService,
    FlaggedQueryListItem,
} from "@/api/services/adminOverride.service";

export function FlaggedQueriesPage() {
    const [data, setData] = useState<FlaggedQueryListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        adminOverrideService
            .listFlaggedQueries()
            .then(setData)
            .catch(() => toast.error("Failed to load flagged queries"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page-enter mx-auto max-w-4xl space-y-6">
            <h1 className="text-lg font-semibold text-text-secondary">
                Flagged Queries
            </h1>

            <div className="rounded-xl border border-slate-200 bg-bg-surface shadow-sm">
                {loading ? (
                    <div className="p-6 text-sm text-text-muted">
                        Loading flagged queries…
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-6 text-sm text-text-muted">
                        No flagged queries.
                    </div>
                ) : (
                            <ul className="space-y-3 p-4">
                                {data.map((q) => (
                                    <li
                                        key={q._id}
                                        onClick={() =>
                                            navigate(`/admin/flagged-queries/${q._id}`)
                                        }
                                        className="
  group cursor-pointer
  rounded-xl
  border border-slate-200
  bg-bg-surface
  p-4
  transition-all duration-200 ease-out
  hover:scale-[1.01]
  hover:border-indigo-300
  hover:bg-indigo-50/40
  hover:shadow-lg
  active:scale-[0.99]
"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <div className="text-sm font-medium text-text-primary">
                                                    {q.flagReason || "No reason provided"}
                                                </div>
                                                <div className="text-xs text-text-muted">
                                                    Flagged on{" "}
                                                    {new Date(q.createdAt).toLocaleString()}
                                                </div>
                                            </div>

                                            <div
                                                className="
            text-indigo-500
            opacity-0
            group-hover:opacity-100
            transition-opacity
            text-sm
          "
                                            >
                                                →
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                )}
            </div>
        </div>
    );
}
