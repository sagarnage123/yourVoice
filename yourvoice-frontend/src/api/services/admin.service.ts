import { apiClient } from "../../api/axios";

export type AllowedIdentityRole =
    | "student"
    | "teacher"
    | "counsellor"
    | "admin";

export interface AllowedIdentity {
    _id: string;
    identifier: string;
    role: AllowedIdentityRole;
    isActive: boolean;
    createdAt: string;
}

export const adminService = {
    async addAllowedIdentity(payload: {
        identifier: string;
        role: AllowedIdentityRole;
        fullName:string | undefined
    }): Promise<AllowedIdentity> {
        const res = await apiClient.post("/api/admin/allowed-identities", payload);
        return res.data.data;
    },

    async listAllowedIdentities(): Promise<AllowedIdentity[]> {
        const res = await apiClient.get("/api/admin/allowed-identities");
        return res.data.data;
    },

    async toggleAllowedIdentity(id: string): Promise<AllowedIdentity> {
        const res = await apiClient.patch(
            `/api/admin/allowed-identities/${id}/toggle`
        );
        return res.data.data;
    },
};
