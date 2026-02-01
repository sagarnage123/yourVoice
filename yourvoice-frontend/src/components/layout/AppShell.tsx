
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { NavLink } from "react-router-dom";

interface AppShellProps {
    children: ReactNode;
}
function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                px-4 py-2
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                }
                `
            }
        >
            {label}
        </NavLink>
    );
}


export function AppShell({ children }: AppShellProps) {
    const { role, logout } = useAuth();

    return (
        <div className="shrink-0">
            <div className="mx-auto max-w-6xl px-4 pt-5">
                <div
                    className="
              sticky top-0 z-50
              flex items-center justify-between
              rounded-xl
              bg-slate-100
              px-4 py-2.5
            "
                >
                   
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight text-slate-800">
                            yourVoice
                        </span>

                        {role && (
                            <span className="
                    rounded-full
                    bg-slate-200
                    px-2 py-0.5
                    text-[10px]
                    font-medium
                    text-slate-600
                    capitalize
                ">
                                {role}
                            </span>
                        )}
                    </div>

                   
                    <div className="
            flex items-center gap-1
            rounded-lg
            bg-white
            p-1
            shadow-sm
        ">
                        {role === "student" && (
                            <>
                                <NavItem to="/student" label="Public" />
                                <NavItem to="/student/inbox" label="Inbox" />
                                <NavItem to="/student/new-query" label="New Query" />
                            </>
                        )}

                        {(role === "teacher" || role === "counselor") && (
                            <>
                                <NavItem to="/staff" label="Public" />
                                <NavItem to="/staff/inbox" label="Inbox" />
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <NavItem to="/admin" label="Identities" />
                                <NavItem to="/admin/flagged-queries" label="Flagged" />
                                <NavItem to="/admin/audit-logs" label="Logs" />
                            </>
                        )}
                    </div>

                    <button
                        onClick={logout}
                        className="
                text-xs
                text-black-500
                hover:text-black-900
                hover:scale-105
                transition
                border border-slate-300
                rounded-full
                px-5 py-3
                bg-slate-300
            "
                    >
                        Log out
                    </button>
                </div>
            
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-6xl px-4 mt-10 mb-10 space-y-10">
                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
}
