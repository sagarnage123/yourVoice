import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    studentStaffService,
    StaffProfile,
} from "../../api/services/studentStaffService";
import { studentQueriesService } from "@/api/services/studentQueries.service";

function Header() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-slate-900">
                Create new query
            </h1>
            <p className="mt-1 text-slate-500">
                Send your first message to begin
            </p>
        </div>
    );
}
function StaffPreview({ staff }: { staff: StaffProfile }) {
    return (
        <div
            className="
        mt-6 rounded-2xl bg-white
        border border-slate-100 shadow-sm
        p-6
      "
        >
            <div
                className="
          flex items-start gap-5
        "
            >
              
                <div className="shrink-0">
                    <Avatar image={staff.profileImage} />
                </div>

              
                <div className="min-w-0 flex-1">
                    <div className="text-lg font-medium text-slate-900 wrap-break-word">
                        {staff.name}
                    </div>

                    <div className="mt-0.5 text-sm text-slate-500 capitalize">
                        {staff.role}
                    </div>

                    {staff.rating.count > 0 && (
                        <div className="mt-1 text-sm text-slate-500">
                            ⭐ {staff.rating.average.toFixed(1)} ·{" "}
                            {staff.rating.count} reviews
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


function Avatar({ image }: { image?: string }) {
    return (
        <img
            src={image}
            alt="Staff avatar"
            className="
        rounded-full object-cover
        w-16 h-16
        sm:w-20 sm:h-20
      "
        />
    );
}


function CreateQuerySkeleton() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-60 bg-slate-100 rounded animate-pulse" />

            <div className="mt-6 h-20 bg-slate-100 rounded-2xl animate-pulse" />
            <div className="mt-6 h-32 bg-slate-100 rounded-xl animate-pulse" />
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

export default function CreateQueryPage() {
    const { staffId } = useParams<{ staffId: string }>();
    const navigate = useNavigate();

    const [staff, setStaff] = useState<StaffProfile | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!staffId) return;
       
        studentStaffService
            .getStaffProfiles()
            .then((list) => {
                const found = list.find((s) => s.id === staffId);
                if (!found) throw new Error("Staff not found");
                setStaff(found);
            })
            .catch(() => setError("Unable to load staff profile"))
            .finally(() => setLoading(false));
    }, [staffId]);

    const handleSubmit = async () => {
        if (!staffId || !message.trim()) return;

        try {
            setSubmitting(true);
            const query = await studentQueriesService.createQuery({
                type:"private",
                assignedTo:staffId,
                content: message.trim(),
            });
            
            navigate(`/student/inbox/${query.id}`);
        } catch {
            setError("Failed to create query");
            setSubmitting(false);
        }
    };

    if (loading) return <CreateQuerySkeleton />;
    if (error) return <ErrorState message={error} />;
    if (!staff) return null;

    return (
        <div className="page-enter min-h-screen bg-linear-to-b from-slate-50 to-white">

            <div className="max-w-3xl mx-auto px-4 py-8">
                <Header />

                <StaffPreview staff={staff} />

                <div className="mt-6">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your concern or question…"
                        rows={5}
                        className="
              w-full rounded-xl border border-slate-200
              p-4 text-slate-900 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200
              resize-none
            "
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim() || submitting}
                        className="
              rounded-xl px-6 py-2.5
              bg-indigo-600 text-white font-medium
              hover:bg-indigo-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
                    >
                        {submitting ? "Starting…" : "Start conversation"}
                    </button>
                </div>
            </div>
        </div>
    );
}
