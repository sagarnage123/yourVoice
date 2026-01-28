import { IQuery } from "./query.model";

export const queryPresenter = (query: IQuery) => {
    return {
        id: query._id,
        type: query.type,
        content: query.content,
        isResolved: query.isResolved,
        createdAt: query.createdAt,

        assignedTo: query.assignedTo
            ? {
                id: query.assignedTo,
                role: query.assignedRole,
            }
            : null,
    };
};
