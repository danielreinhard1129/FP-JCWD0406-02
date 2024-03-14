'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { baseUrl } from '@/app/utils/database';
import isAuth from '@/components/isAuth';
import axios from 'axios';
import { FileInput } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import EditProfileComp from './EditProfile';

interface IUser {
  data: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact: number;
  profile_picture?: string;
  isVerified: boolean;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const uplaoadPhotoProfile = async (formdata: FormData) => {
    try {
      const token = localStorage.getItem('token_auth');

      const { data } = await axios.patch(
        `${baseUrl}/users/photo-profile/${dataUser.id}`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log(data);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConfirmation = async () => {
    setShowConfirmation(false);
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append('file', selectedFile);
      await uplaoadPhotoProfile(formdata);
      setShowConfirmation(false); // Hide the modal after confirmation
      setSelectedFile(null);
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
            <h1
              className={`font-bold ${
                dataUser.isVerified ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {dataUser.isVerified ? 'Verified' : 'Is Not Verified'}
            </h1>
          </div>
          <div className="flex-cols md:flex items-center">
            <div>
              <FileInput name="file" onChange={onChangeFile} />
            </div>
            <div className="pl-4 py-1">
              <EditProfileComp user={dataUser} onSuccess={onSuccess} />
            </div>
            {selectedFile && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  ></span>
                  &#8203;
                  <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Confirm Upload
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to upload this photo?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={handleConfirmation}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => {
                          setShowConfirmation(false);
                          setSelectedFile(null); // Reset selected file
                        }}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ProfilePageComp);
