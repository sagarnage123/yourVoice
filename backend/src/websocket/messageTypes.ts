export interface PingMessage {
    type: "PING";
}

export interface SendReplyMessage {
    type: "SEND_REPLY";
    queryId: string;
    content: string;
    clientMessageId: string;
}

export interface ReplyReceivedMessage {
    type: "REPLY_RECEIVED";
    replyId: string;
}

export type ClientMessage =
    | PingMessage
    | SendReplyMessage
    | ReplyReceivedMessage;