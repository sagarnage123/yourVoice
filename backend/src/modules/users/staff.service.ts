import { User } from "./user.model";

export const StaffService = {
    async listStaff() {
        const data=await User.find({
            role: { $in: ["Academician", "counsellor"] },
        })
            .select("name fullName about areaOfExpertise role rating profileImage")
            .lean();
            
       
        return data;
    },
};
