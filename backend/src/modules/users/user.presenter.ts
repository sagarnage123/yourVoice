import { IUser } from "./user.model";

export const presentUser = (user: IUser) => {
    if (user.role === "student") {
        return {
            id: user._id,
            role: user.role,
        };
    }

    // Staff / admin
    return {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        profileImage: user.profileImage,
        rating: user.rating,
        verifiedBadge: user.verifiedBadge,
    };
};
