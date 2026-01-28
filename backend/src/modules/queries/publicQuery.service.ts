import { QueryModel } from "./query.model";
import { QueryLikeModel } from "./queryLike.model";
import { AppError } from "../../errors/AppError";

export const PublicQueryService = {
    async getPublicQueries(
        page = 1,
        limit = 20,
        userId?: string
    ) {
        const skip = (page - 1) * limit;

        const [queries, total] = await Promise.all([
            QueryModel.find({ type: "public" })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            QueryModel.countDocuments({ type: "public" }),
        ]);

        let likedMap = new Map<string, boolean>();

        if (userId) {
            const likes = await QueryLikeModel.find({
                userId,
                queryId: { $in: queries.map(q => q._id) },
            }).lean();

            likes.forEach(l =>
                likedMap.set(l.queryId.toString(), true)
            );
        }

        return {
            queries: queries.map(q => ({
                ...q,
                hasAgreed: likedMap.get(q._id.toString()) ?? false,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async likeQuery(queryId: string, userId: string) {
        const query = await QueryModel.findById(queryId);

        if (!query || query.type !== "public") {
            throw new AppError("Public query not found", 404);
        }

        try {
            await QueryLikeModel.create({
                queryId,
                userId,
            });
        } catch (error: any) {
            if (error.code === 11000) {
                throw new AppError("Already agreed", 400);
            }
            throw error;
        }

        
        await QueryModel.findByIdAndUpdate(queryId, {
            $inc: { likes: 1 },
        });

        const updated = await QueryModel.findById(queryId).lean();
        return updated?.likes;
    },

    async unlikeQuery(queryId: string, userId: string) {
        const deleted = await QueryLikeModel.findOneAndDelete({
            queryId,
            userId,
        });

        if (!deleted) {
            return;
        }

        await QueryModel.findByIdAndUpdate(queryId, {
            $inc: { likes: -1 },
        });
    }

};
