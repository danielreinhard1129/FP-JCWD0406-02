'use client';
import React, { useEffect } from 'react';
import ProfilePageComp from './components/ProfilePage';
import Sidebar from './components/SideBar';
import { useSelector } from 'react-redux';
import { data } from 'cypress/types/jquery';
import { useParams } from 'next/navigation';

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
}

const ProfilePage = () => {
  const user = localStorage.getItem('dataUser');
  const userr = JSON.stringify(user);

  useEffect(() => {
    user;
  }, []);
  return (
    <div className="md:flex max-w-7xl mx-auto px-8 lg:px-0">
      <Sidebar />
      <ProfilePageComp />
    </div>
  );
};

export default ProfilePage;
