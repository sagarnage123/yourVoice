import { apiClient } from "@/api/axios";

export interface AdminFlaggedQueryOverride {
    query: {
        _id: string;
        flagReason?: string;
        createdAt: string;
    };
    replies: {
        _id: string;
        sender: "student" | "staff";
        content: string;
        createdAt: string;
    }[];
    student: {
        userId: string;
        email?: string;
        phone?: string;
    };
}

export interface FlaggedQueryListItem {
    _id: string;
    createdAt: string;
    flagReason?: string;
}
export const adminOverrideService = {
    async getFlaggedQuery(queryId: string): Promise<AdminFlaggedQueryOverride> {
        const res = await apiClient.get(
            `/api/admin/queries/${queryId}/override`
        );
        return res.data.data;
    },

    async listFlaggedQueries(): Promise<FlaggedQueryListItem[]> {
        const res = await apiClient.get("/api/admin/flagged-queries");
        return res.data.data;
    }
};


