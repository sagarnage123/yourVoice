
import type { UserRole } from "./services/auth.types";

const ROLE_KEY = "yourvoice_role";

export const authRole = {
    get(): UserRole | null {
        return localStorage.getItem(ROLE_KEY) as UserRole | null;
    },
    set(role: UserRole) {
        localStorage.setItem(ROLE_KEY, role);
    },
    clear() {
        localStorage.removeItem(ROLE_KEY);
    },
};
