import { User } from "./user.model";

export const StaffService = {
    async listStaff() {
        return User.find({
            role: { $in: ["teacher", "counsellor"] },
        })
            .select("name role rating profileImage")
            .lean();
    },
};
