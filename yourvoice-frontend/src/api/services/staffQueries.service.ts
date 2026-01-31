import { apiClient } from "@/api/axios";
import type { ApiResponse } from "@/api/types";
import type { StudentQuery } from "@/types/query";
import type { ChatMessage } from "@/types/chat";


export const staffQueriesService = {
    async getAll(): Promise<StudentQuery[]> {
        const res = await apiClient.get<ApiResponse<StudentQuery[]>>(
            "/api/staff/queries"
        );
        return res.data.data;

    },

    async getThread(queryId: string): Promise<ChatMessage[]> {
        const res = await apiClient.get<ApiResponse<ChatMessage[]>>(
            `/api/staff/queries/${queryId}/thread`
        );
        return res.data.data;
    },

    async sendReply(queryId: string, content: string): Promise<void> {
        await apiClient.post(
            `/api/queries/${queryId}/replies`,
            { content }
        );

    },
    async flagQuery(queryId: string, reason:  string):Promise<void>{
        
        await apiClient.post(`/api/queries/${queryId}/flag`,
            {reason});
        return ;
    },
};
