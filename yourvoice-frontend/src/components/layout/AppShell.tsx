
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

interface AppShellProps {
    children: ReactNode;
}

// export function AppShell({ children }: AppShellProps) {
//     const { role, logout } = useAuth();

//     return (
//         <div className="min-h-screen bg-bg-slate text-text-primary">
//             <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
//                 <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
//                     <div className="flex items-center gap-2">
//                         <span className="text-sm font-semibold tracking-tight">
//                             YourVoice
//                         </span>

//                         {role && (
//                             <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-primary capitalize">
//                                 {role}
//                             </span>
//                         )}
//                     </div>

//                     <Button
//                         onClick={logout}
//                         className="bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300 px-1 py-2"
//                     >
//                         Log out
//                     </Button>
//                 </div>
//             </header>

//             <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
//                 {children}
//             </main>
//         </div>
//     );
// }


// export function AppShell({ children }: AppShellProps) {
//     const { role, logout } = useAuth();

//     return (
//         <div className="min-h-screen bg-slate-50 text-text-primary">
//             <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-[0_1px_0_rgba(15,23,42,0.06)]">
//                 <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
//                     <div className="flex items-center gap-2">
//                         <span className="text-sm font-semibold">
//                             YourVoice
//                         </span>

//                         {role && (
//                             <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-primary capitalize">
//                                 {role}
//                             </span>
//                         )}
//                     </div>

//                     <Button
//                         onClick={logout}
//                         className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-1 py-2 focus:ring-slate-300"
//                     >
//                         Log out
//                     </Button>
//                 </div>
//             </header>

//             <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
//                 {children}
//             </main>
//         </div>
//     );
// }
export function AppShell({ children }: AppShellProps) {
    const { role, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 text-text-primary">
            <div className="mx-auto max-w-6xl px-4 pt-6 space-y-6">
               
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold tracking-tight">
                            YourVoice
                        </span>

                        {role && (
                            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-primary capitalize">
                                {role}
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={logout}
                        className="bg-slate-200 text-slate-700 hover:bg-slate-300 text-sm px-3 py-1.5"
                    >
                        Log out
                    </Button>
                </div>

                {/* Page content */}
                <main className="space-y-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
