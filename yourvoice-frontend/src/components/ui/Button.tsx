import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export function Button({
    children,
    loading,
    disabled,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}                
            disabled={disabled || loading}
            className={cn(
                "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
        >
            {loading ? "Loading…" : children}
        </button>
    );
}
