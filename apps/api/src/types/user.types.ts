export interface IUser {
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
}

export interface IAddress {
  id: Number;
  name: String;
  contact: String;
  street: String;
  distric: String;
  city: String;
  province: String;
  postal_code: Number;
}

export interface IRole {
  id: Number;
  role_name: String;
}

export interface ILogin {
  usernameOrEmail: string;
  password: string;
}
