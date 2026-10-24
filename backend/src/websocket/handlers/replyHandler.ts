import { ReplyService } from "../../modules/queries/reply.service";
import { AppError } from "../../errors/AppError";
import type { WebSocket } from "ws";
import type { SendReplyMessage } from "../messageTypes";

interface AuthenticatedUser {
    userId: string;
    role: string;
}

export async function handleSendReply(
    ws: WebSocket,
    message: SendReplyMessage,
    user: AuthenticatedUser
): Promise<void> {
    try {
        const reply = await ReplyService.createReply(
            message.queryId,
            {
                content: message.content,
                clientMessageId: message.clientMessageId,
            },
            user
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
}