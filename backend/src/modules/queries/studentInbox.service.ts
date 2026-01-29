import { QueryModel } from "./query.model";
import { ReplyModel } from "./reply.model";
import { User } from "../users/user.model";
import { AppError } from "../../errors/AppError";

export const StudentInboxService = {
    async getInbox(user: { userId: string; role: string }) {
        if (user.role !== "student") {
            throw new AppError("Access denied", 403);
        }

        const queries = await QueryModel.find({
            type: "private",
            createdBy: user.userId,
        })
            .sort({ updatedAt: -1 })
            .lean();

        const inbox = await Promise.all(
            queries.map(async (query) => {
                const lastReply = await ReplyModel.findOne({
                    queryId: query._id,
                })
                    .sort({ createdAt: -1 })
                    .select("createdAt")
                    .lean();

                const staff = await User.findById(query.assignedTo)
                    .select("name role rating profileImage")
                    .lean();

                return {
                    queryId: query._id,
                    assignedTo: staff
                        ? {
                            id: staff._id,
                            name: staff.fullName,
                            role: staff.role,
                            rating: staff.rating,
                            profileImage: staff.profileImage,
                        }
                        : null,
                    isResolved: query.isResolved,
                    createdAt: query.createdAt,
                    lastMessageAt:
                        lastReply?.createdAt ?? query.createdAt,
                };
            })
        );

        inbox.sort(
            (a, b) =>
                b.lastMessageAt.getTime() -
                a.lastMessageAt.getTime()
        );

        return inbox;
    },
};
