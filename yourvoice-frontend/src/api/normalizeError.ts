import { AxiosError } from "axios";
import type{ ApiError } from "./error";

export function normalizeAxiosError(error: AxiosError): ApiError {
    if (!error.response) {
        return {
            code: "NETWORK_ERROR",
            message: "Unable to connect. Please check your internet connection.",
        };
    }

    const status = error.response.status;

    if (status === 401) {
        return {
            code: "UNAUTHORIZED",
            status,
            message: "Your session has expired. Please log in again.",
        };
    }

    if (status === 403) {
        return {
            code: "FORBIDDEN",
            status,
            message: "You don’t have permission to perform this action.",
        };
    }

    if (status === 404) {
        return {
            code: "NOT_FOUND",
            status,
            message: "The requested resource was not found.",
        };
    }

    if (status === 422) {
        return {
            code: "VALIDATION_ERROR",
            status,
            message: "Some inputs are invalid. Please review and try again.",
            details: error.response.data,
        };
    }

    if (status >= 500) {
        return {
            code: "SERVER_ERROR",
            status,
            message: "Something went wrong on our side. Please try again later.",
        };
    }

    return {
        code: "UNKNOWN_ERROR",
        status,
        message: "An unexpected error occurred. Please try again.",
    };
}
