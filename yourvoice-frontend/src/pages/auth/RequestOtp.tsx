import { useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authService } from "@/api/services/auth.service";
import type { UserRole } from "@/api/services/auth.types";
import type { ApiError } from "@/api/error";
import { useNavigate } from "react-router-dom";

export function RequestOtp() {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [role, setRole] = useState<UserRole>("student");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        
        if (!identifier.trim()) {
            setError("Please enter your email or phone number.");
            return;
        }
       
        try {
            setLoading(true);
            setError(null);

            await authService.requestAuth({ identifier, role });

            navigate("/auth/verify", {
                state: { identifier, role },
            });
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
      
            <div className="space-y-7">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Welcome to yourVoice
                    </h1>
                    <p className="text-sm text-slate-500">
                        Secure access using a one-time verification code
                    </p>
                </div>

                <Input
                    label="Email or Phone"
                    placeholder="you@college.edu"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={loading}
                />

               
                <div className="space-y-2">
                    <label className="text-sm text-text-secondary">I am a</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="
                    w-full
                    rounded-lg
                    border border-slate-300
                    px-3 py-2.5
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-200
                    transition
                    "

                        disabled={loading}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="counselor">Counselor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {error && (
                    <p className="text-sm text-red-500 text-center">
                        {error}
                    </p>

                )}

                <Button
                type="button"
                    onClick={async () => {
                        await handleSubmit()}}
                    loading={loading}
                    className="
  w-full
  rounded-full
  bg-linear-to-r from-indigo-500 to-violet-500
  text-white
  hover:from-indigo-600 hover:to-violet-600
  active:scale-95
  transition-all duration-200
"

                >
                    Send verification code
                </Button>
            </div>
    );
}
