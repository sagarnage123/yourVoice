export const staffInboxPresenter = (item: {
    queryId: any;
    isResolved: boolean;
    createdAt: Date;
    lastMessageAt: Date;
    isFlagged: boolean;
}) => {
    return {
        queryId: item.queryId,
        isResolved: item.isResolved,
        isFlagged: item.isFlagged,
        createdAt: item.createdAt,
        lastMessageAt: item.lastMessageAt,
    };
};
