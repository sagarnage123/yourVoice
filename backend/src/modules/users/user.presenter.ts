import { IUser } from "./user.model";

export const presentUser = (user: IUser) => {
    if (user.role === "student") {
        return {
            id: user._id,
            role: user.role,
        };
    }

    return {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        about: user.about||"not provided",
        areaOfExpertise: user.areaOfExpertise||["not provided"],
        profileImage: user.profileImage,
        rating: user.rating,
        verifiedBadge: user.verifiedBadge,
    };
};
