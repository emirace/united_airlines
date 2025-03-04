import { IGetAllUsersResponse, IProfileData } from "../types/user";
import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUserProfile = async (profileData: IProfileData) => {
  const response = await api.put("/users", profileData);
  return response.data;
};

export const updateUserById = async (id: string, profileData: IProfileData) => {
  const response = await api.put(`/users/${id}`, profileData);
  return response.data;
};

export const inviteUser = async (email: string) => {
  const response = await api.post("/users/invite", { email });
  return response.data;
};

export const fetchAllUsers = async (data: {
  page: number;
  limit: number;
  search: string;
}): Promise<IGetAllUsersResponse> => {
  try {
    const response = await api.get<IGetAllUsersResponse>("/users/all", {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
