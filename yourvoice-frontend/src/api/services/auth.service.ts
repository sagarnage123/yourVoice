import { apiClient } from "../axios";
import type{ ApiResponse } from "../types";
import type{
    RequestAuthPayload,
    VerifyAuthPayload,
    VerifyAuthResponse,
    CurrentUserResponse
} from "./auth.types";


export const authService = {
    async requestAuth(payload: RequestAuthPayload): Promise<void> {
        await apiClient.post("/api/auth/request", payload);
    },

    async verifyAuth(
        payload: VerifyAuthPayload
    ): Promise<VerifyAuthResponse> {
       
        const response = await apiClient.post<
            ApiResponse<VerifyAuthResponse>
        >("/api/auth/verify", payload);
       
        return response.data.data;
    },
    
    async getCurrentUser(): Promise<CurrentUserResponse> {
    const response = await apiClient.get<
      ApiResponse<CurrentUserResponse>
    >("/api/auth/me");

    return response.data.data;
  },

    async logout(): Promise<void> {
        await apiClient.post("/api/auth/logout");
    },
};
