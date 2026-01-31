import { apiClient } from "@/api/axios";

export interface PublicQuery {
    id: string;
    content: string;
    likes: number;
    hasAgreed: boolean;
    createdAt: string;
}

export interface PublicQueryResponse {
    queries: PublicQuery[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const publicQueriesService = {
    async getAll(page = 1): Promise<PublicQueryResponse> {
        const res = await apiClient.get("/api/queries/public", {
            params: { page },
        });
        return res.data.data;
    },

    async like(queryId: string): Promise<number> {
        const res = await apiClient.post(`/api/queries/${queryId}/like`);
        return res.data.data.likes;
    },

    async unlike(queryId: string): Promise<void> {
        await apiClient.delete(`/api/queries/${queryId}/like`);
    },

    async create(content: string): Promise<void> {
        await apiClient.post("api/queries/", {
            type:"public",
            content,
        });
    }

};
