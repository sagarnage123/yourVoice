import axios, { AxiosError } from "axios";

import type { ApiError } from "./error";
import { normalizeAxiosError } from "./normalizeError";
import { authToken } from "./authToken";

export const apiClient = axios.create({
    baseURL: "https://yourvoice-backend.onrender.com",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use((config) => {
    const token = authToken.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError): Promise<never> => {
        const normalizedError: ApiError = normalizeAxiosError(error);
        return Promise.reject(normalizedError);
    }
);
