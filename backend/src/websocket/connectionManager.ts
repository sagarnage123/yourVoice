
import type { WebSocket } from "ws";

export interface AuthenticatedUser {
    userId: string;
    role: string;
}

const userConnections = new Map<string, Set<WebSocket>>();
const connectionUsers = new Map<WebSocket, AuthenticatedUser>();
const connectionSessions = new Map<WebSocket, string>();

export function registerConnection(
    ws: WebSocket,
    user: AuthenticatedUser,
    sessionKey: string
): void {
    let connections = userConnections.get(user.userId);

    if (!connections) {
        connections = new Set<WebSocket>();
        userConnections.set(user.userId, connections);
    }

    connections.add(ws);
    connectionUsers.set(ws, user);
    connectionSessions.set(ws, sessionKey);
}

export function removeConnection(ws: WebSocket): void {
    const user = connectionUsers.get(ws);

    if (!user) return;

    const connections = userConnections.get(user.userId);

    connections?.delete(ws);

    if (connections?.size === 0) {
        userConnections.delete(user.userId);
    }

    connectionUsers.delete(ws);
    connectionSessions.delete(ws);
}

export function closeConnectionsForSession(
    sessionKey: string
): void {
    for (const [ws, key] of connectionSessions) {
        if (key === sessionKey) {
            ws.terminate();
        }
    }
}
export function getUserForConnection(
    ws: WebSocket
): AuthenticatedUser | undefined {
    return connectionUsers.get(ws);
}

export function getConnectionsForUser(
    userId: string
): Set<WebSocket> {
    return userConnections.get(userId) ?? new Set<WebSocket>();
}
