export type UserRole = "student" | "Academician" | "admin" | "counselor";

export interface RequestAuthPayload {
    identifier: string;
    role: UserRole;
}

export interface VerifyAuthPayload {
    identifier: string;
    token: string;
    role: UserRole;
}

export interface VerifyAuthResponse {
    token: string;
    user: {
        id: string;
        role: UserRole;
        token:string,
        name: string;
        email?: string;
    };
}
