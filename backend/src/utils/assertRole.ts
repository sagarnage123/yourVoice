import { AppError } from "../errors/AppError";

export const assertRole = (
    role: string,
    allowed: string[]
) => {
    if (!allowed.includes(role)) {
        throw new AppError("Access denied", 403);
    }
};
