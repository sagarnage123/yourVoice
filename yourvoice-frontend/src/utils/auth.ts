interface JwtPayload {
    sub?: string;
    id?: string;
    _id?: string;
    userId?: string;
}

export function getUserIdFromToken(token: string): string | null {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload)) as JwtPayload;

        return (
            decoded.userId ||
            decoded.id ||
            decoded._id ||
            decoded.sub ||
            null
        );
    } catch {
        return null;
    }
}
