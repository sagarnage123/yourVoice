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
                Choose a Academician or counsellor you’d like to connect with.
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
                group w-full text-left rounded-2xl p-4 sm:p-6
                bg-white border border-slate-100
                shadow-sm
                sm:hover:shadow-xl sm:hover:-translate-y-1
                hover:border-slate-200
                transition-all duration-300
                min-h-50 flex flex-col
            "
        >
           
            <div className="flex items-center gap-4">
                <Avatar role={staff.role} />

                <div className="flex-1">
                    <h3 className="wrap-words-break text-lg font-semibold text-slate-900 leading-tight">
                        {staff.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                        <RoleBadge role={staff.role} />

                        {staff.rating.count > 0 && (
                            <span className="text-xs text-slate-500">
                                ⭐ {staff.rating.average.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

           
            <div className="mt-4 h-px bg-slate-100" />

            
            <div className="mt-4">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 wrap-words-break italic">
                    {staff.about?.trim()
                        ? staff.about
                        : "No description provided"}
                </p>
            </div>

           
            <div className="flex-1" />

           
            <div className="mt-4">
                {staff.areaOfExpertise?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {staff.areaOfExpertise.slice(0, 2).map((item, i) => (
                            <span
                                key={i}
                                className="
                                    text-xs px-3 py-1 rounded-full
                                    bg-slate-50 text-slate-600
                                    border border-slate-100
                                "
                            >
                                {item}
                            </span>
                        ))}

                        {staff.areaOfExpertise.length > 2 && (
                            <span className="text-xs text-slate-500 italic">
                                +{staff.areaOfExpertise.length - 2} more
                            </span>
                        )}
                    </div>
                ) : (
                    <p className="text-xs text-slate-600 italic">
                        No expertise listed
                    </p>
                )}
            </div>
        </button>
    );
}
function Avatar({ role }: { role: "Academician" | "counsellor" }) {
    const styles =
        role === "Academician"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-emerald-100 text-emerald-600";

    return (
        <div
            className={`
        h-10 w-10 sm:h-12 sm:w-12 rounded-full
        flex items-center justify-center
        font-semibold text-sm
        ${styles}
      `}
        >
            {role === "Academician" ? "A" : "C"}
        </div>
    );
}
function RoleBadge({ role }: { role: "Academician" | "counsellor" }) {
    const styles =
        role === "Academician"
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
        <div className="min-h-full bg-slate-50">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                <div className="h-7 w-64 bg-slate-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-80 bg-slate-100 rounded animate-pulse" />

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <div className="page-enter min-h-full bg-linear-to-b from-slate-50 to-white">

            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                <Header />

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
