import { QueryRating } from "./queryRating.model";
import { QueryModel } from "../queries/query.model";
import { User } from "../users/user.model";
import { AppError } from "../../errors/AppError";

export async function rateQuery(
    queryId: string,
    studentId: string,
    rating: number
) {
   
    const query = await QueryModel.findById(queryId);
    if (!query) {
        throw new AppError("Query not found", 404);
    }

    if (query.createdBy.toString() !== studentId) {
        throw new AppError("Not allowed", 403);
    }

    if (!query.assignedTo) {
        throw new AppError("Query not assigned", 400);
    }

    
    await QueryRating.create({
        queryId,
        studentId,
        staffId: query.assignedTo,
        rating,
    });

    const staff = await User.findById(query.assignedTo);
    if (!staff) return;

    const prevCount = staff.rating?.count || 0;
    const prevAvg = staff.rating?.average || 0;

    const newCount = prevCount + 1;
    const newAvg =
        (prevAvg * prevCount + rating) / newCount;

    staff.rating = {
        average: Number(newAvg.toFixed(2)),
        count: newCount,
    };
  
    await staff.save();
}
