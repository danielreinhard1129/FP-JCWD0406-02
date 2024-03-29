'use client';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../utils/database';
import HeaderProfile from './components/HeaderProfile';
import ProfilePageComp from './components/ProfilePageComp';
import Sidebar from './components/SideBar';
import { NotLoginGuard } from '@/components/protected-route/components/NotLoginGuard';
import isAuth from '@/components/isAuth';
import { useRouter } from 'next/navigation';

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
  const userId = useSelector((state: IUser) => state.user.id);
  const router = useRouter();
  const [userData, setUserData] = useState<Partial<IUser> | null>(null);

  const getDataUser = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/user/${userId}`);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]); //

  useEffect(() => {
    if (!userId) {
      router.push('/');
    }
  });

  const refreshProfile = async () => {
    getDataUser();
  };

  return (
    <div className="min-h-screen flex max-w-7xl flex-col mb-20 md:mb-0 lg:flex-row gap-4 mx-auto px-4 lg:px-8 md:mt-8">
      <div className="w-full lg:w-1/4 xl:w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 space-y-4">
        <HeaderProfile />
        {userData && (
          <ProfilePageComp data={userData} onSuccess={refreshProfile} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
