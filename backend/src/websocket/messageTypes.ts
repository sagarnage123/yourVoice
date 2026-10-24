export interface PingMessage {
    type: "PING";
}

export interface SendReplyMessage {
    type: "SEND_REPLY";
    queryId: string;
    content: string;
    clientMessageId: string;
}

export type ClientMessage =
    | PingMessage
    | SendReplyMessage;