export interface IUser {
  _id: string;
  createdAt: string;
  role: string;
  status: string;
  emailVerified: boolean;
  email: string;
  lastName: string;
  firstName: string;
  image?: string;
  mobile: string;
  nationality: string;
  dob: string;
  gender: string;
  address: string;
}

export interface IProfileData {
  lastName?: string;
  firstName?: string;
  email?: string;
  image?: string;
  mobile?: string;
  nationality?: string;
  dob?: string;
  gender?: string;
  address?: string;
}

export interface IGetAllUsersResponse {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}
