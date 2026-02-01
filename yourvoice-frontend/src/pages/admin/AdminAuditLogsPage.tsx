import { useEffect, useState } from "react";

import { format } from "date-fns";
import { adminService } from "@/api/services/admin.service";

const { fetchAuditLogs } = adminService;

interface AuditLog {
    id: string;
    action: string;
    actor: {
        id: string;
        role: string;
    };
    target: string;
    metadata: Record<string, any>;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function AdminAuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLogs();
       
    }, [page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetchAuditLogs({ page, limit: 20 });
            setLogs(res.logs);
            setPagination(res.pagination);
        } finally {
            setLoading(false);
        }
    };

    return (
      
        <div className="p-6 space-y-6">
            
            <div>
                <h1 className="text-xl font-semibold text-gray-900">
                    Audit Logs
                </h1>
                <p className="text-sm text-gray-500">
                    System activity performed by administrators
                </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                {loading ? (
                    <div className="p-6 text-sm text-gray-500">
                        Loading audit logs…
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">
                        No audit logs found.
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-left text-gray-600">
                                <th className="px-4 py-3">Time</th>
                                <th className="px-4 py-3">Action</th>
                                <th className="px-4 py-3">Actor</th>
                                <th className="px-4 py-3">Target</th>
                                <th className="px-4 py-3">Metadata</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </td>

                                    <td className="px-4 py-4 font-medium text-gray-900">
                                        {log.action}
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-900 capitalize">
                                            {log.actor.role}
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono">
                                            {log.actor.id}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-gray-700">
                                        {log.target}
                                    </td>

                                    <td className="px-4 py-4 text-xs text-gray-600 max-w-sm">
                                        {Object.keys(log.metadata).length > 0 ? (
                                            <pre className="whitespace-pre-wrap wrap-break-word bg-gray-50 p-2 rounded-md">
                                                {JSON.stringify(log.metadata, null, 2)}
                                            </pre>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
