import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../api/services/auth.types";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
}

export function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const { isAuthenticated, role, isInitializing } = useAuth();

    if (isInitializing) {
        return null; 
    }


   
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    
    if (allowedRoles && !role) {
        return <Navigate to="/unauthorized" replace />;
    }

    
    if (allowedRoles && role && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}
