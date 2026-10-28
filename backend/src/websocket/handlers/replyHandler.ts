
import { WebSocket } from "ws";
import { ReplyService } from "../../modules/queries/reply.service";
import { QueryService } from "../../modules/queries/query.services";

import { AppError } from "../../errors/AppError";
import { getConnectionsForUser } from "../connectionManager";
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
    let recipientId: string;
    let reply;

   
    try {
        recipientId = await QueryService.getReplyRecipient(
            message.queryId,
            user
        );
    } catch (error: unknown) {
        ws.send(JSON.stringify({
            type: "ERROR",
            clientMessageId: message.clientMessageId,
            message: error instanceof AppError
                ? error.message
                : "Failed to authorize reply",
        }));
        return;
    }

    
    try {
        reply = await ReplyService.createReply(
            message.queryId,
            {
                content: message.content,
                clientMessageId: message.clientMessageId,
            },
            user
        );
    } catch (error: unknown) {
        if (!(error instanceof AppError)) {
            console.error("Failed to persist reply:", error);
        }

        ws.send(JSON.stringify({
            type: "ERROR",
            clientMessageId: message.clientMessageId,
            message: error instanceof AppError
                ? error.message
                : "Failed to save reply",
        }));
        return;
    }

   
    ws.send(JSON.stringify({
        type: "REPLY_SAVED",
        clientMessageId: message.clientMessageId,
        replyId: reply._id.toString(),
    }));

   
    const recipientConnections = getConnectionsForUser(recipientId);

    const event = JSON.stringify({
        type: "NEW_REPLY",
        queryId: message.queryId,
        replyId: reply._id.toString(),
        clientMessageId: reply.clientMessageId,
        content: reply.content,
        senderRole: reply.senderRole,
        createdAt: reply.createdAt,
    });

    for (const recipientWs of recipientConnections) {
        if (recipientWs.readyState !== WebSocket.OPEN) {
            continue;
        }

        try {
            recipientWs.send(event);
        } catch (error) {
            console.error("Failed to deliver reply:", error);
        }
    }
}
