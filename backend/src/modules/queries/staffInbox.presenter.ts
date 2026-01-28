export const staffInboxPresenter = (item: {
    queryId: any;
    isResolved: boolean;
    createdAt: Date;
    lastMessageAt: Date;
}) => {
    return {
        queryId: item.queryId,
        isResolved: item.isResolved,
        createdAt: item.createdAt,
        lastMessageAt: item.lastMessageAt,
    };
};
