import type { WebSocket ,RawData} from "ws";
import type { AuthenticatedUser } from "./connectionManager";
import { validateClientMessage } from "./messageValidation";
import { handleSendReply } from "./handlers/replyHandler";
import { handleReplyReceived } from "./handlers/deliveryHandler";

export async function handleWebSocketMessage(
    ws: WebSocket,
    data: RawData,
    user: AuthenticatedUser
): Promise<void> {
    let parsed: unknown;

    try {
        parsed = JSON.parse(data.toString());
    } catch {
        ws.send(JSON.stringify({
            type: "ERROR",
            message: "Invalid JSON",
        }));
        return;
    }

    const message = validateClientMessage(parsed);

    if (!message) {
        ws.send(JSON.stringify({
            type: "ERROR",
            message: "Invalid message structure or unsupported message type",
        }));
        return;
    }

    switch (message.type) {
        case "PING":
            ws.send(JSON.stringify({ type: "PONG" }));
            return;

        case "SEND_REPLY":
            await handleSendReply(ws, message, user);
            return;
        case "REPLY_RECEIVED":
            await handleReplyReceived(ws, message, user);
            return;

        default:
            ws.send(JSON.stringify({
                type: "ERROR",
                message: "Unsupported message type",
            }));
            return;
    }
}