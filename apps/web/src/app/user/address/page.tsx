'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import AddressCardComp from './components/AddressCard';
import HeaderAddress from './components/HeaderAddress';
import Image from 'next/image';

export interface ICity {
  id: string;
  name: string;
}

export interface IAddress {
  addressData: any;
  id: number;
  userId: number;
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postal_code: number;
  isPrimary?: boolean;
  City?: ICity;
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
  const [user, setUser] = useState<Partial<IUser>[]>([]);
  console.log('ini user', user);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/user-addresses/${userId}`,
      );
      console.log('data address iniiiiii', response.data.data);

      setAddresses(response.data.data);
      setUser(response.data.data.user);
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
    <div className="flex max-w-7xl flex-col lg:flex-row gap-4 mx-auto px-4 lg:px-8 mt-8 min-h-screen">
      <div className="w-full lg:w-1/4 xl:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full lg:flex-1 space-y-4">
        <HeaderAddress refreshAddresses={refreshAddresses} />
        {addresses.length > 0 ? (
          <AddressCardComp
            addressData={addresses}
            refreshAddresses={refreshAddresses}
            userId={userId}
          />
        ) : (
          <div className="flex justify-center items-center w-full  ">
            <Image
              src="/address/address1.png"
              alt="No Address"
              className="rounded-lg"
              style={{ maxWidth: '100%', maxHeight: '50%' }}
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddress;
