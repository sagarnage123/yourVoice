import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminService, AllowedIdentity } from "@/api/services/admin.service";
import { useNavigate } from "react-router-dom";


function Header() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                Allowed Identities
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                Manage and update academic and counselling profiles
            </p>
        </div>
    );
}
function IdentityCard({
    item,
    onEdit,
}: {
    item: AllowedIdentity;
    onEdit: (item: AllowedIdentity) => void;
}) {
    return (
        <div
            className="
        group rounded-2xl p-5
        bg-white border border-slate-100
        shadow-sm hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        flex flex-col min-h-45
      "
        >
           
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">
                        {item.fullName || "Unnamed"}
                    </h3>
                    <p className="text-xs text-slate-500 capitalize">
                        {item.role}
                    </p>
                </div>

                <span
                    className={`
            text-xs px-2 py-1 rounded-full
            ${item.isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"}
          `}
                >
                    {item.isActive ? "Active" : "Inactive"}
                </span>
            </div>

           
            <p className="mt-4 text-sm text-slate-600 italic line-clamp-2">
                {item.about || "No description provided"}
            </p>

          
            <div className="flex-1" />

           
            <div className="mt-4">
                {item.areaOfExpertise?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {item.areaOfExpertise.slice(0, 2).map((exp, i) => (
                            <span
                                key={i}
                                className="
                  text-xs px-3 py-1 rounded-full
                  bg-slate-50 text-slate-600
                  border border-slate-100
                "
                            >
                                {exp}
                            </span>
                        ))}

                        {item.areaOfExpertise.length > 2 && (
                            <span className="text-xs text-slate-400 italic">
                                +{item.areaOfExpertise.length - 2} more
                            </span>
                        )}
                    </div>
                ) : (
                    <span className="text-xs text-slate-600 italic">
                        No expertise listed
                    </span>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                    }}
                    
      className="
  text-xs font-medium
  text-slate-500
  hover:text-indigo-800
  hover:text-sm
    transition-colors duration-200"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
export function AllAllowedIdentitiesPage() {
    const [data, setData] = useState<AllowedIdentity[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        adminService.listAllowedIdentities()
            .then(setData)
            .catch(() => toast.error("Failed to load identities"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page-enter max-w-6xl mx-auto px-4 py-8">
            <Header />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <IdentityCard key={item._id} item={item} onEdit={(identity) => {
                        navigate("/admin/", {
                            state: { identity },
                        });
                    }}
                    />
                ))}
            </div>
        </div>
    );
}