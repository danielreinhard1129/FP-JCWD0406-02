'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/app/utils/database';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';

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

const AddressCardComp = (addressData: any) => {
  const addressDataUser = addressData.addressData;

  if (!addressDataUser) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex justify-between border-b-2 items-center w-full p-4 md:py-6">
        <h2 className="text-2xl font-semibold">Address</h2>
        <button
          // onClick={openEditModal}
          className="bg-teal-600 text-white flex items-center font-semibold text-md py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="mr-2" /> Add Address
        </button>
      </div>
      <div className="w-full flex-grow p-4">
        {addressDataUser.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Image
              src="/address/address1.png"
              alt="No Address"
              width={400}
              height={400}
              objectFit="contain"
            />
          </div>
        ) : (
          <div>
            {addressDataUser.map((address: any) => (
              <div
                key={address.id}
                className="border p-4 gap-10 md:flex justify-between w-full items-center rounded-lg"
              >
                <div>
                  <div className="text-md font-semibold">{address.name}</div>
                  <div className="text-sm">{address.contact}</div>
                  <div className="text-sm">
                    {address.street}, {address.district}, {address.city},{' '}
                    {address.province}, {address.postal_code}
                  </div>
                </div>
                <div className="space-y-2 mt-3 ">
                  <button
                    className="bg-transparent mx-1 hover:bg-teal-700 text-teal-600 font-normal text-xs hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                    // onClick={onEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white text-xs font-normal py-2 px-4 rounded-lg"
                    // onClick={onSetDefault}
                  >
                    Set as Default
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCardComp;
