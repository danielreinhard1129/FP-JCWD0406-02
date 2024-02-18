'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/app/utils/database';
import { useParams } from 'next/navigation';
import { param } from 'cypress/types/jquery';

interface Address {
  name: string;
  contact: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
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
}

const AddressCard: React.FC<{ address: Address }> = ({ address }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-semibold">{address.name}</h3>
    <p>{address.contact}</p>
    <p>{address.street}</p>
    <p>{address.district}</p>
    <p>{address.city}</p>
    <p>{address.province}</p>
    <p>{address.postalCode}</p>
  </div>
);

const AddressCardComp = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const userId = localStorage.getItem('dataUser');
  console.log('yestttttt', userId);

  // const userId = useSelector((state: IUser) => state.user.id);
  // console.log(userId);

  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/user-addresses/`);
  //     // console.log('hello', response.data);
  //     setAddresses(response.data);
  //     console.log('testttttttt', response.data);
  //   } catch (error) {
  //     console.error('Error fetching addresses:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (userId) fetchAddresses();
  // }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex justify-between items-center w-full p-4">
        <h2 className="text-xl font-semibold">Addresses</h2>
      </div>
      <div className="w-full flex-grow p-4 space-y-4 overflow-auto">
        {addresses.map((address, index) => (
          <AddressCard key={index} address={address} />
        ))}
      </div>
    </div>
  );
};

export default AddressCardComp;
