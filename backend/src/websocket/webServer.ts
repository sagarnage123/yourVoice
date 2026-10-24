
import { WebSocketServer } from "ws";
import type { Server, IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import cookie from "cookie";
import { createHash } from "node:crypto";
import { verifyToken } from "../utils/jwt";
import { ReplyService } from "../modules/queries/reply.service";
import { getConnectionsForUser } from "./connectionManager";
import {
    registerConnection,
    removeConnection,
    getUserForConnection,
} from "./connectionManager";
import { AppError } from "../errors/AppError";

const allowedOrigins = new Set([
    "https://yourvoice-zeta.vercel.app",
    "http://localhost:5173",
]);

function rejectUpgrade(
    socket: Duplex,
    statusCode: number,
    message: string
) {
    if (socket.destroyed) return;

    socket.write(
        `HTTP/1.1 ${statusCode} ${message}\r\n` +
        "Connection: close\r\n\r\n"
    );

    socket.destroy();
}

function getToken(request: IncomingMessage): string | undefined {
    const cookies = request.headers.cookie ? cookie.parse(request.headers.cookie) : {};
    return cookies.yourvoice_token;
}

export function initializeWebSocketServer(httpServer: Server) {
    const wss = new WebSocketServer({
        noServer: true,
        maxPayload: 1024 * 16
    });

    httpServer.on("upgrade", (request, socket, head) => {
        const origin = request.headers.origin;

        if (!origin || !allowedOrigins.has(origin)) {
            rejectUpgrade(socket, 403, "Forbidden");
            return;
        }

        const token = getToken(request);

        if (!token) {
            rejectUpgrade(socket, 401, "Unauthorized");
            return;
        }
        const sessionKey = createHash("sha256")
            .update(token)
            .digest("hex");

        try {
            const user = verifyToken(token);

            wss.handleUpgrade(request, socket, head, (ws) => {
                registerConnection(ws, {
                    userId: user.userId,
                    role: user.role,
                },
                    sessionKey);

                wss.emit("connection", ws, request);

            });
        } catch {
            rejectUpgrade(socket, 401, "Unauthorized");
        }
    });

    wss.on("connection", (ws) => {
        console.log("WebSocket client connected");

        ws.on("message", async (data) => {

            const user = getUserForConnection(ws);
            if (!user) {
                ws.close(1008, "Unauthenticated connection");
                return;
            }


            let message: unknown;
            try {
                message = JSON.parse(data.toString());
            } catch {
                ws.send(JSON.stringify({
                    type: "ERROR",
                    message: "Invalid JSON",
                }));
                return;
            }



            if (
                typeof message !== "object" ||
                message === null ||
                !("type" in message) ||
                typeof message.type !== "string"
            ) {
                ws.send(JSON.stringify({
                    type: "ERROR",
                    message: "Invalid message structure"
                }));
                return;
            }


            if (message.type === "PING") {
                ws.send(JSON.stringify({
                    type: "PONG",
                    message: "PONG",
                }));

            }
            if (message.type !== "SEND_REPLY") {
                ws.send(JSON.stringify({
                    type: "ERROR",
                    message: "Unsupported message type"
                }));
                return;
            }
            if (
                !("queryId" in message) ||
                typeof message.queryId !== "string" ||
                !message.queryId.trim() ||
                !("content" in message) ||
                typeof message.content !== "string" ||
                !message.content.trim() ||
                !("clientMessageId" in message) ||
                typeof message.clientMessageId !== "string" ||
                !message.clientMessageId.trim()
            ) {
                ws.send(JSON.stringify({
                    type: "ERROR",
                    message: "queryId, content, and clientMessageId are required",
                }));
                return;
            }

            try {
                const reply = await ReplyService.createReply(
                    message.queryId,
                    {
                        content: message.content,
                        clientMessageId: message.clientMessageId,
                    },
                    {
                        userId: user.userId,
                        role: user.role,
                    }
                );

                ws.send(JSON.stringify({
                    type: "REPLY_SAVED",
                    clientMessageId: message.clientMessageId,
                    replyId: reply._id.toString(),
                }));
            } catch (error: unknown) {
                if (error instanceof AppError) {
                    ws.send(JSON.stringify({
                        type: "ERROR",
                        clientMessageId: message.clientMessageId,
                        message: error.message,
                    }));
                    return;
                }

                console.error("Failed to persist WebSocket reply:", error);

                ws.send(JSON.stringify({
                    type: "ERROR",
                    clientMessageId: message.clientMessageId,
                    message: "Failed to save reply",
                }));
            }



        });

        ws.on("close", () => {
            removeConnection(ws);
            console.log("WebSocket client disconnected");
        });
    });

    return wss;
}
