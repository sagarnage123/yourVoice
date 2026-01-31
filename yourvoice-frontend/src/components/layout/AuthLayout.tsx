import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
                <Outlet />
            </div>
        </div>
    );
}
