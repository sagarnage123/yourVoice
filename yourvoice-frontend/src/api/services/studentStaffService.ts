import {apiClient} from "@/api/axios";

export type StaffRole = "teacher" | "counselor";

export interface StaffRating {
    average: number;
    count: number;
}

export interface StaffProfile {
    id: string;
    name:string | "staff";
    role: StaffRole;
    rating: StaffRating;
    profileImage:string;
}

export interface GetStaffProfilesResponse {
    success: boolean;
    message: string;
    data: StaffProfile[];
}

export const studentStaffService = {
    async getStaffProfiles(): Promise<StaffProfile[]> {
        const res = await apiClient.get<GetStaffProfilesResponse>("api/staff/");
      
        return res.data.data;
    },
};
