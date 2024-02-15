export interface IUser {
  id: Number;
  first_name: String;
  last_name: String;
  username: String;
  email: String;
  password: String;
  contact: String;
  roleId: Number;
  profile_picture: String;
  created_at: Date;
  updatedAt: Date;
  userAddress_id: Number;
}

export interface Iaddress {
  id: Number;
  name: String;
  contact: String;
  street: String;
  distric: String;
  city: String;
  province: String;
  postal_code: Number;
}

export interface Irole {
  id: Number;
  role_name: String;
}
