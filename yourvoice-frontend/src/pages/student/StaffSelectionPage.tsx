import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentStaffService,StaffProfile } from "@/api/services/studentStaffService";

function Header() {
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Start a new conversation
            </h1>
            <p className="mt-2 text-slate-500 max-w-xl">
                Choose a teacher or counselor you’d like to connect with.
            </p>
        </div>
    );
}
function StaffCard({
    staff,
    onClick,
}: {
    staff: StaffProfile;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="
        group w-full text-left rounded-2xl p-5
        bg-white/80 backdrop-blur
        border border-slate-100
        shadow-sm
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200
      "
        >
            <div className="flex items-center gap-4">
                <Avatar role={staff.role} />

                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-slate-900">
                            {staff.name === "staff"
                                ? staff.role === "teacher"
                                    ? "Teacher"
                                    : "Counselor"
                                : staff.name}
                        </h3>

                        <RoleBadge role={staff.role} />
                    </div>

                    {staff.rating.count > 0 && (
                        <div className="mt-1 text-sm text-slate-500">
                            ⭐ {staff.rating.average.toFixed(1)} ·{" "}
                            {staff.rating.count} reviews
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
}
function Avatar({ role }: { role: "teacher" | "counselor" }) {
    const styles =
        role === "teacher"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-emerald-100 text-emerald-600";

    return (
        <div
            className={`
        h-12 w-12 rounded-full
        flex items-center justify-center
        font-semibold text-sm
        ${styles}
      `}
        >
            {role === "teacher" ? "T" : "C"}
        </div>
    );
}
function RoleBadge({ role }: { role: "teacher" | "counselor" }) {
    const styles =
        role === "teacher"
            ? "bg-indigo-50 text-indigo-600"
            : "bg-emerald-50 text-emerald-600";

    return (
        <span
            className={`
        text-xs px-2.5 py-0.5 rounded-full
        font-medium capitalize
        ${styles}
      `}
        >
            {role}
        </span>
    );
}
function StaffSelectionSkeleton() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="h-7 w-64 bg-slate-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-80 bg-slate-100 rounded animate-pulse" />

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-24 rounded-2xl bg-slate-100 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
function ErrorState({ message }: { message: string }) {
    return (
        <div className="h-64 flex items-center justify-center">
            <p className="text-slate-500">{message}</p>
        </div>
    );
}

export default function StaffSelectionPage() {
    const navigate = useNavigate();

    const [staff, setStaff] = useState<StaffProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        studentStaffService
            .getStaffProfiles()
            .then(setStaff)
            .catch(() => setError("Unable to load staff at the moment"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <StaffSelectionSkeleton />;
    if (error) return <ErrorState message={error} />;

    return (
        <div className="page-enter min-h-screen bg-linear-to-b from-slate-50 to-white">

            <div className="max-w-6xl mx-auto px-4 py-8">
                <Header />

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staff.map((member) => (
                        <StaffCard
                            key={member.id}
                            staff={member}
                            onClick={() =>
                                navigate(`/student/new-query/${member.id}`)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
