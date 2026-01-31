import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/api/services/auth.service";

import type { ApiError } from "@/api/error";
import type { UserRole } from "@/api/services/auth.types";

import { authRole } from "@/api/authRole";

interface LocationState {
    identifier: string;
    role: UserRole;
}

export function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState | null;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!state) {
        navigate("/auth");
        return null;
    }

    async function handleVerify() {
        if (!otp.trim()) {
            setError("Please enter the verification code.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await authService.verifyAuth({
                identifier: state!.identifier,
                token: otp,
                role: state!.role,
            });
            authRole.set(result.user.role);
            console.log(otp,result.user.role);
            
            if(result.user.role==="student" || result.user.role=="admin")
            navigate(`/${result.user.role}`);
            else navigate("/staff");
        
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
                    Verify your code
                </h1>
                <p className="text-sm text-slate-500">
                    Enter the 6-digit verification code sent to you
                </p>
            </div>

           
            <Input
                label="Verification code"
                placeholder="••••••"
                value={otp}
                inputMode="numeric"
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                className="tracking-widest text-center text-lg"
            />

            
            {error && (
                <p className="text-sm text-red-500 text-center">
                    {error}
                </p>
            )}

           
            <Button
                onClick={handleVerify}
                loading={loading}
                className="
                w-full
                rounded-full
                bg-linear-to-r from-indigo-500 to-violet-500
                text-white
                hover:from-indigo-600 hover:to-violet-600
                active:scale-95
                transition-all duration-200
                py-3 
            "
            >
                Verify & continue
            </Button>

            {/* Subtle helper */}
            <p className="text-xs text-slate-400 text-center">
                Didn’t receive the code? Check spam or try again.
            </p>
        </div>
    );

}
