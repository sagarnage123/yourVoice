
import {Menu} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {  useState,useRef, type ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {AnimatePresence , motion} from "framer-motion";
interface AppShellProps {
    children: ReactNode;
}
function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                shrink-0 px-4 py-2
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                btnRef.current &&
                !btnRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileMenuOpen]);
    
    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6 pt-4 sm:pt-5">
                <div
                    className="
                        sticky top-0 z-50
                        flex items-center
                        justify-between
                        sm:justify-between
                        rounded-xl
                        bg-slate-100
                        px-3 sm:px-4 py-2.5
                        shadow-sm
                        "
                >
                   
                    <div className="flex flex-wrap items-center gap-2">
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

                   
                    <div
                        className="
                        hidden md:flex
                        items-center gap-1
                        overflow-x-auto scrollbar-hide
                        rounded-lg
                        bg-white
                        p-1
                        shadow-sm
                        max-w-full
                        "
                    >
                        {role === "student" && (
                            <>
                                <NavItem to="/student" label="Public" />
                                <NavItem to="/student/inbox" label="Inbox" />
                                <NavItem to="/student/new-query" label="New Query" />
                            </>
                        )}

                        {(role === "Academician" || role === "counsellor") && (
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
                                <NavItem to="/admin/allowed-identities/all" label="Allowed Identities" />
                            </>
                        )}
                    </div>

                    <button
                        ref={btnRef}
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        className="
                        md:hidden
                        rounded-lg
                        border border-slate-300
                        bg-white
                        px-3 py-2
                        text-sm
                        text-slate-700
                        shadow-sm
                        "
                    >
                        <Menu className="h-4 w-4" />
                    </button>

                    <button
                        onClick={logout}
                        className="
                        hidden
                         md:block
                text-xs
                text-black-500
                hover:text-black-900
                hover:scale-105
                transition
                border border-slate-300
                rounded-full
                px-4 sm:px-5 py-2.5
                bg-slate-300
            "
                    >
                        Log out
                    </button>
                </div>
                <div className="md:hidden">
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
        fixed top-16 left-0 right-0
        w-full
        md:hidden
        mt-3
        rounded-xl
        bg-slate-100
        px-4 py-3
        p-2
        shadow-sm
        space-y-2
        "
                    >
                        <div className="flex flex-col gap-1">
                            {role === "student" && (
                                <>
                                    <NavItem to="/student" label="Public" />
                                    <NavItem to="/student/inbox" label="Inbox" />
                                    <NavItem to="/student/new-query" label="New Query" />
                                </>
                            )}

                            {(role === "Academician" || role === "counsellor") && (
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
                                    <NavItem
                                        to="/admin/allowed-identities/all"
                                        label="Allowed Identities"
                                    />
                                </>
                            )}
                        </div>

                        <button
                            onClick={logout}
                            className="
            w-full
            rounded-lg
            border border-slate-300
            bg-white
            px-4 py-2.5
            text-sm
            text-slate-700
            "
                        >
                            Log out
                        </button>
                    </motion.div>
                )}
                </AnimatePresence>
                </div>
            
                <main className="flex-1 min-w-0 overflow-x-hidden">
                    <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6 mt-6 sm:mt-10 mb-10 space-y-6 sm:space-y-10">
                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
}
