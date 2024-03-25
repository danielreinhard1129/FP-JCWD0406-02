'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { baseUrl, baseUrll } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { FileInput, Label } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { FaCamera, FaEdit, FaUserCircle } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { toast } from 'sonner';
import EditProfileComp from './EditProfile';
import ModalChangeEmail from './ModalChangeEmail';
import SendEmailVerifyButton from './SendEmailVerifyButton';
import { logoutAction } from '@/lib/features/userSlice';
import { useDispatch } from 'react-redux';
import ChangePasswordConfirmSendEmail from './ChangePasswordConfirmSendEmail';
import Image from 'next/image';

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

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token_auth');

    dispatch(logoutAction());
    window.location.href = '/login';

    toast.success('Logged out successfully');
  };

  const uplaoadPhotoProfile = async (formdata: FormData) => {
    try {
      const token = localStorage.getItem('token_auth');

      const { data } = await axios.patch(
        `${baseUrl}/users/photo-profile/${dataUser.id}`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success('Update Photo Profile Success');
      console.log(data);
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
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

  return (
    <div className="space-y-5 mx-auto">
      <div className="flex justify-between px-4">
        <div className="text-gray-400 text-lg font-extralight"></div>
        <div className="-mt-14">
          <EditProfileComp user={dataUser} onSuccess={onSuccess} />
        </div>
      </div>
      <div className="md:px-6 ">
        <div className="">
          <div className="md:flex items-center gap-5">
            <div className="flex flex-col items-center mb-6">
              {/* Profile icon */}
              <div className="relative group cursor-pointer">
                <label
                  htmlFor="file-upload"
                  className="rounded-full overflow-hidden w-44 h-44 block"
                >
                  <Image
                    src={
                      dataUser?.profile_picture
                        ? `${baseUrll}/photo-profile/${dataUser.profile_picture}`
                        : '/default-avatar.png'
                    }
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                  <div className="cursor-pointer absolute inset-0 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <FaEdit className="text-white text-xl" />
                  </div>
                </label>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={onChangeFile}
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
            <div className="mb-6 px-4">
              {/* Adjust alignment and flex direction based on screen size */}
              <div className="flex md:flex-row md:gap-2 gap-1 text-xl md:text-2xl font-bold items-center justify-center md:justify-start text-center md:text-left">
                <span>{dataUser?.first_name}</span>
                <span>{dataUser?.last_name}</span>
                {dataUser?.isVerified && (
                  <span className="shrink-0">
                    <RiVerifiedBadgeFill className="text-teal-500" />
                  </span>
                )}
              </div>
              <div className="text-base md:text-lg font-normal text-center md:text-left">
                <span>@{dataUser?.username || userGoogle?.displayName}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-4 border-4 rounded-xl border-slate-200">
            <h1 className="md:text-lg text-base font-bold border-b-2">
              Personal Information
            </h1>

            {/* Contact & Email Section */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4">
              <div className="col-span-1 text-xs md:text-base font-semibold text-gray-500">
                Contact :
              </div>
              <div className="md:col-span-2 font-semibold ">
                {dataUser?.contact || userGoogle?.contact}
              </div>

              <div className="col-span-1 text-xs md:text-base font-semibold text-gray-500">
                Email :
              </div>
              <div className="md:col-span-2 font-semibold flex justify-between items-center">
                <span>{dataUser?.email || userGoogle?.email}</span>
                <ModalChangeEmail user={dataUser} onSuccess={onSuccess} />
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 my-4 items-center">
              <div className="col-span-1 text-xs md:text-base font-semibold text-gray-500">
                Password :
              </div>
              <div className="md:col-span-2 font-semibold flex justify-between items-center">
                <span>**************</span>
                <ChangePasswordConfirmSendEmail />
              </div>
            </div>

            {/* Status Section */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 my-4 items-center">
              <div className="col-span-1 font-semibold text-xs md:text-base text-gray-500">
                Status :
              </div>
              <div className="md:col-span-2 flex justify-between items-center">
                <span
                  className={`${
                    dataUser?.isVerified ? 'text-teal-500' : 'text-red-500'
                  } font-bold`}
                >
                  {dataUser?.isVerified ? 'Verified' : 'Not Verified'}
                </span>
                {!dataUser?.isVerified && (
                  <SendEmailVerifyButton user={dataUser} />
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 ">
            <div className="relative mx-auto mt-5 md:mt-0">
              <div className="space-y-5 mx-auto block md:hidden">
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-red-600 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
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
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
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
    </div>
  );
};

export default ProfilePageComp;
