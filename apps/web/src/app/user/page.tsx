'use client';
import React, { useEffect, useState } from 'react';
import ProfilePageComp from './components/ProfilePage';
import Sidebar from './components/SideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../utils/database';

export interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  contact: number;
  roleId: number;
  isDeleted: boolean;
  isVerified: boolean;
  profile_picture: string;
  created_at: Date;
  updatedAt: Date;
  userAddress_id: number;
}

const ProfilePage: React.FC = () => {
  const userId = useSelector((state: IUser) => state.user?.id);

  const [userData, setUserData] = useState<Partial<IUser> | null>(null);

  const getDataUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/user/${userId}`);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, [userId]);

  const refreshProfile = async () => {
    getDataUser();
  };

  return (
    <div className="md:flex h-screen max-w-7xl mx-auto px-8 lg:px-0">
      <Sidebar data={userData} />
      {userData && (
        <ProfilePageComp data={userData} onSuccess={refreshProfile} />
      )}
    </div>
  );
};

export default ProfilePage;
