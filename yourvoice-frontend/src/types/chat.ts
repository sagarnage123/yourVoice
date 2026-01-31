export type ChatSender = "student" | "staff";
export interface QueryChatServiceGetData {
    messages: ChatMessage[];
    query:{
        id: string;
        type: "public" | "private";
        content: string;
        isResolved: boolean;
        createdAt: string;
    }
}
export interface ChatMessage {
    id: string;
    sender: ChatSender;
    content: string;
    createdAt: string;
}
