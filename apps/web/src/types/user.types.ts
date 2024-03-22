export interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  contact: string;
  roleId: number;
  isDeleted: boolean;
  isVerified: boolean;
  profile_picture: string;
  created_at: Date;
  updatedAt: Date;
  userAddress_id: number;
  addresses: IAddress;
}

export interface IAddress {
  id: number;
  userId: number;
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  cityId: string;
  province: string;
  postal_code: number;
}

export interface IRole {
  id: number;
  role_name: string;
}

export interface ILogin {
  usernameOrEmail: string;
  password: string;
}

export interface IReset {
  password: string;
  confirmPassword: string;
}
