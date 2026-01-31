import { apiClient } from "@/api/axios";
import type { ApiResponse } from "@/api/types";
import type {QueryChatServiceGetData } from "@/types/chat";
let flag=false;
export const queryChatService = {
    async getMessages(queryId: string): Promise<QueryChatServiceGetData> {
        const res = await apiClient.get<ApiResponse<QueryChatServiceGetData>>(
            `/api/queries/${queryId}/thread`);
       
        return res.data.data;
    },

    async sendMessage(queryId: string, content: string): Promise<void> {
        await apiClient.post(`/api/queries/${queryId}/replies`, {
            content,
        });
    },
};
