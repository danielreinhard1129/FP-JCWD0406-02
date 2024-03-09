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
  id: number;
  userId: number;
  name: string;
  contact: string;
  street: string;
  district: string;
  cityId: string;
  city: string;
  province: string;
  postal_code: number;
  isDefault: boolean;
  latitude: number;
  longitude: number;
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

export interface IOngkir {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

export interface ICity {
  id: number;
  name: string;
}
