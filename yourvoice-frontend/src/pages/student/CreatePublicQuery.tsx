import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicQueriesService } from "@/api/services/publicQueries.service";
import toast from "react-hot-toast";

export function CreatePublicQuery() {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        if (!content.trim()) {
            toast.error("Please write something first");
            return;
        }

        try {
            setSubmitting(true);
            await publicQueriesService.create(content.trim());
            toast.success("Question posted");
            navigate("/student/");
        } catch {
            toast.error("Failed to post question");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="page-enter mx-auto max-w-3xl space-y-6">
            <h1 className="text-lg font-semibold text-text-secondary">
                Ask a public question
            </h1>

            <div
                className="
                    rounded-xl
                    border border-slate-200
                    bg-bg-surface
                    p-6
                    space-y-4
                    shadow-sm
                    transition-all duration-200 ease-out
                    hover:border-indigo-300
                    hover:bg-indigo-50/40
                "
            >
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    placeholder="Ask your question openly so others can benefit…"
                    className="
                        w-full
                        resize-none
                        rounded-lg
                        border border-slate-300
                        px-3 py-2.5
                        text-sm
                        leading-relaxed
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-200
                    "
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="
                            rounded-full
                            bg-linear-to-r from-indigo-500 to-violet-500
                            px-5 py-2.5
                            text-sm font-medium text-white
                            hover:from-indigo-600 hover:to-violet-600
                            active:scale-95
                            transition-all duration-200
                            disabled:opacity-50
                        "
                    >
                        Post question
                    </button>
                </div>
            </div>
        </div>
    );
}
