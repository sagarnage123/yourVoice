import { apiClient } from "../axios";
import type{ ApiResponse } from "../types";
import type{
    RequestAuthPayload,
    VerifyAuthPayload,
    VerifyAuthResponse,
} from "./auth.types";
import { authToken } from "../authToken";
import { authRole } from "../authRole";

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

        const { user } = response.data.data;
       
        authToken.set(user.token);
        authRole.set(user.role);

        return response.data.data;
    },

    logout(): void {
        authToken.clear();
        authRole.clear();
    },
};
