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
    isInitializing: boolean;
}



interface AuthContextValue extends AuthState {
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole | null>(null);
    const [isInitializing, setIsInitializing] = useState(true)

    useEffect(() => {
        const token = authToken.get();
        const storedRole = authRole.get();

        if (token && storedRole) {
            setRole(storedRole);
        }

        setIsInitializing(false);
    }, []);
;


    const value = useMemo<AuthContextValue>(() => {
        return {
            isAuthenticated: Boolean(role),
            role,
            isInitializing,
            login: (newRole: UserRole) => {
                authRole.set(newRole);
                setRole(newRole);
            },
            logout: () => {
                authToken.clear();
                authRole.clear();
                setRole(null);
            },
        };
    }, [role, isInitializing]);


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
