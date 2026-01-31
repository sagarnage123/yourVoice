import { apiClient } from "@/api/axios";
import type { ApiResponse } from "@/api/types";
import type { StudentQuery } from "@/types/query";
interface CreateQueryInput {
    type: "public" | "private";
    content: string;
    assignedTo?: string;
}
interface CreateQueryReponse{
    id: string,
    type: "public" | "private",
    content: string,
    isResolved: boolean,
    createdAt: string,
    assignedTo:string|null;
}
export const studentQueriesService = {
    async getAll(): Promise<StudentQuery[]> {
        const res = await apiClient.get<ApiResponse<StudentQuery[]>>(
            "/api/student/queries"
        );
        return res.data.data;
    },

    async createQuery(payload: CreateQueryInput){
        const res=await apiClient.post("/api/queries",payload);
        return res.data.data;
    }
    ,
    async rateQuery(queryId:string,value:number){
        
        await apiClient.post(`/api/queries/${queryId}/rate`,{
            rating:value
        });

    }
};
