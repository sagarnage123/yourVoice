import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    className,
    ...props
}: InputProps) {
    return (
        <div className="space-y-2">
            <div>

            {label && (
                <label className="text-sm font-medium text-text-secondary">
                    {label }
                </label>
            )}
            </div>
            <div>

            <input
                {...props}
                className={cn(
                    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-brand-primary/30",
                    "transition disabled:opacity-60 disabled:cursor-not-allowed",
                    error && "border-danger",
                    className
                )}
                />

            {error && (
                <p className="text-xs text-danger">{error}</p>
            )}
            </div>
        </div>
    );
}
