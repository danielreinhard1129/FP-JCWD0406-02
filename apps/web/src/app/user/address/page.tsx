'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import AddressCardComp from './components/AddressCard';

export interface IAddress {
  addressData: any;
  id: number;
  userId: number;
  name: string;
  contact: string;
  street: string;
  distric: string;
  city: string;
  province: string;
  postal_code: number;
}

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
  refreshAddresses: any;
}
const UserAddress: React.FC = () => {
  const userId = useSelector((state: IUser) => state.user?.id);
  const [addresses, setAddresses] = useState<Partial<IAddress>[]>([]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/user-addresses/${userId}`,
      );
      // console.log('data address iniiiiii', response.data.data);

      setAddresses(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const refreshAddresses = async () => {
    fetchAddresses();
  };

  return (
    <div className="md:flex h-screen max-w-7xl mx-auto px-8 lg:px-0">
      <Sidebar />
      <AddressCardComp
        addressData={addresses}
        refreshAddresses={refreshAddresses}
      />
    </div>
  );
};

export default UserAddress;
