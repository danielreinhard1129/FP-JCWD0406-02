'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import EditProfileComp from './EditProfile';
import { useSelector } from 'react-redux';
import isAuth from '@/components/isAuth';
import { FileInput } from 'flowbite-react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

interface IUser {
  data: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact: number;
  profile_picture?: string;
}

interface ProfilePageCompProps {
  data: Partial<IUser>;
  onSuccess: () => void;
}

const ProfilePageComp: React.FC<ProfilePageCompProps> = ({
  data,
  onSuccess,
}) => {
  const { userGoogle } = UserAuth();
  const dataUser = data;
  const uplaoadPhotoProfile = async (formdata: FormData) => {
    try {
      const token = localStorage.getItem('token_auth');

      const { data } = await axios.patch(
        `${baseUrl}/users/photo-profile/${dataUser.id}`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const formdata = new FormData();
      formdata.append('file', selectedFile);
      await uplaoadPhotoProfile(formdata);
    }
  };

  console.log('dataaaaaaaa', dataUser);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="flex w-full md:ml-6 lg:max-w-xl h-screen">
      <div className="flex-1 lg:mt-20 mt-5 lg:ml-6">
        <h1 className="text-dark-blue text-2xl mb-4 p-6 font-semibold">
          Account Detail
        </h1>
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1 className="">First Name</h1>
            <h1 className="font-bold">{dataUser?.first_name}</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1>Last Name</h1>
            <h1 className="font-bold">{dataUser?.last_name}</h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-24">
            <h1>Username</h1>
            <h1 className="font-bold ml-1">
              {dataUser?.username || userGoogle?.displayName}
            </h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-28">
            <h1>Contact</h1>
            <h1 className="font-bold ml-1">
              {dataUser?.contact || userGoogle?.contact}
            </h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-x-32">
            <h1>Email</h1>
            <h1 className="font-bold ml-2">
              {dataUser?.email || userGoogle?.email}
            </h1>
          </div>
          <div className="mb-4 flex justify-between lg:justify-normal lg:gap-32">
            <h1>Status</h1>
            <h1 className="font-bold">Verified</h1>
          </div>
          <div className="flex-cols md:flex items-center">
            {/* <div className="pl-4 py-1">
              <button
                // onClick={openEditModal}
                className="bg-[#f1eed8] hover:bg-[#b0cac1] self-center text-teal text-xs font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
              >
                Change Profile Picture
              </button>
            </div> */}
            <div>
              <FileInput name="file" onChange={onChangeFile} />
            </div>
            <div className="pl-4 py-1">
              <EditProfileComp user={dataUser} onSuccess={onSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ProfilePageComp);
