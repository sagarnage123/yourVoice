import { User } from "./user.model";

export const StaffService = {
    async listStaff() {
        return User.find({
            role: { $in: ["Academician", "counsellor"] },
        })
            .select("name fullName role rating profileImage")
            .lean();
    },
};
