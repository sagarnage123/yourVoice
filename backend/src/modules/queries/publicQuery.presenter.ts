export const publicQueryPresenter = (query: any) => {
    return {
        id: query._id,
        content: query.content,
        likes: query.likes,
        hasAgreed: query.hasAgreed,
        createdAt: query.createdAt,
    };
};
