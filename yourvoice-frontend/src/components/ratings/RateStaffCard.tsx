interface RateStaffCardProps {
    onRate: (value: number) => void;
    disabled?: boolean;
}

export function RateStaffCard({
    onRate,
    disabled,
}: RateStaffCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-bg-surface p-3 sm:p-5 shadow-sm space-y-2 sm:space-y-3">
            <div className="text-xs sm:text-sm font-medium text-text-secondary">
                Rate your experience
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button
                        key={n}
                        disabled={disabled}
                        onClick={() => onRate(n)}
                        className="
              text-xl sm:text-2xl
              transition-transform duration-150
              hover:scale-110
              active:scale-95
              disabled:opacity-40
            "
                    >
                        ⭐
                    </button>
                ))}
            </div>

            <p className="hidden sm:block text-xs text-text-muted">
                Your rating helps improve guidance quality.
            </p>
        </div>
    );
}
