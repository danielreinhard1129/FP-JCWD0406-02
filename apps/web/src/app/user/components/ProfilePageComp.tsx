'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { baseUrl } from '@/app/utils/database';
import isAuth from '@/components/isAuth';
import axios, { AxiosError } from 'axios';
import { FileInput, Label } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { FaCamera, FaUserCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import EditProfileComp from './EditProfile';
import ModalChangeEmail from './ModalChangeEmail';
import SendEmailVerifyButton from './SendEmailVerifyButton';

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
      <div className="flex w-full ">
        <div className="flex-1">
          <div className="grid md:grid-cols-2 ">
            <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-1 md:gap-4 md:gap-x-20 px-4 md:px-10">
              <div className="flex justify-between items-center md:items-start md:col-span-1">
                <span className="font-semibold text-gray-700">First Name:</span>
                <span>{dataUser?.first_name}</span>
              </div>
              <div className="flex justify-between items-center md:items-start md:col-span-1">
                <span className="font-semibold text-gray-700">Last Name:</span>
                <span>{dataUser?.last_name}</span>
              </div>
              <div className="flex justify-between items-center md:items-start md:col-span-1">
                <span className="font-semibold text-gray-700">Username:</span>
                <span>{dataUser?.username || userGoogle?.displayName}</span>
              </div>
              <div className="flex justify-between items-center md:items-start md:col-span-1">
                <span className="font-semibold text-gray-700">Contact:</span>
                <span>{dataUser?.contact || userGoogle?.contact}</span>
              </div>
              <div className="flex justify-between items-start md:col-span-1">
                <span className="font-semibold text-gray-700">Email:</span>
                <div className="flex flex-col items-end">
                  <span>{dataUser?.email || userGoogle?.email}</span>
                  <ModalChangeEmail user={dataUser} onSuccess={onSuccess} />
                </div>
              </div>

              <div className="flex justify-between items-start md:col-span-1">
                <span className="font-semibold text-gray-700">Status:</span>
                <div className="flex flex-col items-end ">
                  <span
                    className={
                      dataUser.isVerified
                        ? 'text-green-500 font-bold'
                        : 'text-red-500'
                    }
                  >
                    {dataUser.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                  {/* <VerificationEmail /> */}
                  {!dataUser.isVerified && (
                    <SendEmailVerifyButton user={dataUser} />
                  )}
                </div>
              </div>
            </div>
            <div className="relative mx-auto mt-5 md:mt-0">
              <div className="flex-cols text-center space-y-2 transform transition-all hover:scale-105 duration-300">
                <label className="text-gray-500">
                  Update Your Profile Picture
                </label>
                <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-sm bg-white">
                  <Label
                    htmlFor="dropzone-file"
                    className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="relative">
                      <FaUserCircle className="text-gray-300 h-16 w-16 md:h-24 md:w-24 mt-5" />
                      <label
                        htmlFor="file-upload"
                        className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer"
                      >
                        <FaCamera className="h-5 w-5 md:h-6 md:w-6" />
                      </label>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        className="hidden"
                        onChange={onChangeFile}
                        accept=".jpg, .jpeg, .png" // only allow specific file types
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center p-4 ">
                      Max File Size: 1MB, only JPG, JPEG, PNG are supported.
                    </p>
                    <FileInput
                      id="dropzone-file"
                      className="hidden"
                      name="file"
                      onChange={onChangeFile}
                    />
                  </Label>
                </div>
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
    </div>
  );
};

export default isAuth(ProfilePageComp);
