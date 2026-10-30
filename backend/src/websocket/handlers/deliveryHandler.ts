import type { WebSocket } from "ws";
import { ReplyService } from "../../modules/queries/reply.service";
import { AppError } from "../../errors/AppError";
import type { ReplyReceivedMessage } from "../messageTypes";

interface AuthenticatedUser {
    userId: string;
    role: string;
}

export async function handleReplyReceived(
    ws: WebSocket,
    message: ReplyReceivedMessage,
    user: AuthenticatedUser
): Promise<void> {
    try {
        const reply = await ReplyService.markAsDelivered(
            message.replyId,
            user.userId
        );

        ws.send(JSON.stringify({
            type: "DELIVERY_CONFIRMED",
            replyId: reply!._id.toString(),
            deliveryStatus: reply!.deliveryStatus,
            deliveredAt: reply!.deliveredAt,
        }));
    } catch (error: unknown) {
        if (error instanceof AppError) {
            ws.send(JSON.stringify({
                type: "ERROR",
                replyId: message.replyId,
                message: error.message,
            }));
            return;
        }

        console.error("Failed to acknowledge reply delivery:", error);

        ws.send(JSON.stringify({
            type: "ERROR",
            replyId: message.replyId,
            message: "Failed to acknowledge delivery",
        }));
    }
}