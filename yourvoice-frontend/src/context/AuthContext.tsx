import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { UserRole } from "../api/services/auth.types";

import { authRole } from "@/api/authRole";

import { authService } from "@/api/services/auth.service";


interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
    isInitializing: boolean;
}



interface AuthContextValue extends AuthState {
    login: (role: UserRole) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole | null>(null);
    const [isInitializing, setIsInitializing] = useState(true)

    useEffect(() => {
    const restoreSession = async () => {
      try {
        const { user } = await authService.getCurrentUser();

        const userRole = user.role;
        setRole(userRole);
        authRole.set(userRole);
      } catch {
       
        setRole(null);
        authRole.clear();
      } finally {
        setIsInitializing(false);
      }
    };

    void restoreSession();
  }, []);

    const value = useMemo<AuthContextValue>(() => {
        return {
            isAuthenticated: Boolean(role),
            role,
            isInitializing,
            login: (newRole: UserRole) => {
                authRole.set(newRole);
                setRole(newRole);
            },
            logout: async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.error("Logout failed:", error);
                }

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
