import { UserRole } from "../modules/users/user.model";
import {} from "express-serve-static-core";
import {Request} from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: UserRole;
            };
        }
    }
}

export { };
