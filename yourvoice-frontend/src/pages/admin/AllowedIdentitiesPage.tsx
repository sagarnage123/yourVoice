import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    adminService,
    AllowedIdentity,
    AllowedIdentityRole,
} from "@/api/services/admin.service";
import { Link } from "react-router-dom";
const ROLE_OPTIONS: AllowedIdentityRole[] = [
    "student",
    "teacher",
    "counsellor",
    "admin",
];

export function AllowedIdentitiesPage() {
    
    const [identifier, setIdentifier] = useState("");
    const [role, setRole] = useState<AllowedIdentityRole>("student");
    const [fullName, setFullName] = useState("");

    const [submitting, setSubmitting] = useState(false);


    async function handleAdd() {
        if (!identifier.trim()) {
            toast.error("Identifier is required");
            return;
        }
        if (
            (role === "teacher" || role === "counsellor") &&
            !fullName.trim()
        ) {
            toast.error("Official name is required");
            return;
        }


        try {
            setSubmitting(true);
            await adminService.addAllowedIdentity({
                identifier: identifier.trim(),
                role,
                fullName:
                    role === "teacher" || role === "counsellor"
                        ? fullName.trim()
                        : undefined,
            });

            toast.success("Identity added successfully");
        } catch (err: any) {
            if (err?.response?.status === 409) {
                toast.error("Identity already exists");
            } else {
                toast.error("Failed to add identity");
            }
        } finally {
            setSubmitting(false);
        }
    }

    async function handleToggle(id: string) {
        try {
            const updated = await adminService.toggleAllowedIdentity(id);
            toast.success("Identity status updated");
        } catch {
            toast.error("Failed to update status");
        }
    }

    return (
        <div className="page-enter mx-auto max-w-4xl space-y-4">
            <h1 className="text-lg font-semibold text-text-secondary">
                Allowed Identities
            </h1>
            <div>
                <Link
                    to="/admin/allowed-identities/all"
                    className="text-xs text-indigo-600 hover:underline gap-y-1"
                >
                    View all allowed identities
                </Link>

            </div>

            
                <div className="rounded-xl border border-slate-200 bg-bg-surface p-5 shadow-sm space-y-5">
                    <div className="space-y-1">
                        <h2 className="text-sm font-medium text-text-secondary">
                            Add Allowed Identity
                        </h2>
                        <p className="text-xs text-text-muted">
                            Pre-approve a faculty or counsellor before OTP login
                        </p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-text-muted">
                            Identifier (email or phone)
                        </label>
                        <input
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="e.g. faculty@school.com"
                            className="
        w-full rounded-lg
        border border-slate-300
        px-3 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-200
      "
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-text-muted">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as AllowedIdentityRole)}
                                className="
          w-full rounded-lg
          border border-slate-300
          px-3 py-2.5 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-200
        "
                            >
                                {ROLE_OPTIONS.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(role === "teacher" || role === "counsellor") && (
                            <div className="space-y-1 animate-fadeIn">
                                <label className="text-xs text-text-muted">
                                    Official full name
                                </label>
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. Dr. Ananya Sharma"
                                    className="
            w-full rounded-lg
            border border-slate-300
            px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-200
          "
                                />
                            </div>
                        )}
                    </div>

                    {/* Action */}
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleAdd}
                            disabled={submitting}
                        className="
  group
  inline-flex items-center gap-2
  rounded-full
  bg-linear-to-r from-indigo-500 to-violet-500
  px-5 py-2.5
  text-sm font-medium text-white
  hover:from-indigo-600 hover:to-violet-600
  active:scale-95
  transition-all duration-200
  shadow-sm
  disabled:opacity-50
"

                        >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                                +
                            </span>
                            Add identity
                        </button>
                    </div>
                </div>
        </div>
    );
}
