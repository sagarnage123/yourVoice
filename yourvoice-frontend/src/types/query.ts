export interface StudentQuery {
    queryId: string;
    subject?: string;
    content: string;
    assignedTo?: {
        id: string;
        name: string;
    };
    isFlagged:boolean;
    lastMessage?: string;
    lastMessageAt: string;
    unreadCount?: number;
}
