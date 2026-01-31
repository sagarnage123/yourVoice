import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { UserRole } from "../api/services/auth.types";
import { authToken } from "../api/authToken";
import { authRole } from "@/api/authRole";
interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
}

interface AuthContextValue extends AuthState {
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole | null>(null);

    
    useEffect(() => {
        const token = authToken.get();
        if (token) {
            const storedRole = authRole.get();
            if (storedRole) {
                setRole(storedRole);
            }
        }
    }, []);

    const value = useMemo<AuthContextValue>(() => {
        return {
            isAuthenticated: Boolean(authToken.get()),
            role:authRole.get(),
            logout: () => {
                authToken.clear();
                authRole.clear();
                setRole(null);
            },
        };
    }, [role]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
