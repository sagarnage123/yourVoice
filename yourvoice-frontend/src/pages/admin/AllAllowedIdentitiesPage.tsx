import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminService, AllowedIdentity } from "@/api/services/admin.service";

export function AllAllowedIdentitiesPage() {
    const [data, setData] = useState<AllowedIdentity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminService
            .listAllowedIdentities()
            .then(setData)
            .catch(() => toast.error("Failed to load identities"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page-enter mx-auto max-w-4xl space-y-4">
            <h1 className="text-lg font-semibold text-text-secondary">
                All Allowed Identities
            </h1>

            <div className="rounded-xl border border-slate-200 bg-bg-surface shadow-sm">
                {loading ? (
                    <div className="p-6 text-sm text-text-muted">Loading…</div>
                ) : data.length === 0 ? (
                    <div className="p-6 text-sm text-text-muted">
                        No identities found.
                    </div>
                ) : (
                    <ul className="divide-y">
                        {data.map((i) => (
                            <li key={i._id} className="px-4 py-3 flex justify-between">
                                <div>
                                    <div className="text-sm font-medium">{i.identifier}</div>
                                    <div className="text-xs text-text-muted">{i.role}</div>
                                </div>
                                <span
                                    className={`text-xs font-medium ${i.isActive ? "text-green-600" : "text-slate-500"
                                        }`}
                                >
                                    {i.isActive ? "Active" : "Inactive"}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
