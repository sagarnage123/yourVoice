import { AppError } from "../errors/AppError";

export const getSingleParam = (
    param: string | string[] | undefined,
    name: string
): string => {
    if (!param) {
        throw new AppError(`${name} is required`, 400);
    }

    if (Array.isArray(param)) {
        throw new AppError(`${name} must be a single value`, 400);
    }

    return param;
};
