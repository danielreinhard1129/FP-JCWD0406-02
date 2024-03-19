import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';
import { FaMailBulk } from 'react-icons/fa';

interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact: number;
  profile_picture?: string;
}

interface sendEmailProps {
  user: Partial<IUser>;
}

const SendEmailVerifyButton: React.FC<sendEmailProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCekEmail, setIsCekEmail] = useState(false);
  console.log('check email fomr passing : ', user);

  const sendEmailVerify = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/send-email-for-verif`,
        { email: user.email },
      );

      console.log(response);
      if (response.status === 200) {
        const successMsg = response.data.message;
        setIsCekEmail(true);
        toast.success(successMsg);
        setIsModalOpen(false);
        setTimeout(() => {
          setIsCekEmail(false); // Close the verification modal after some time
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="cursor-pointer text-teal-500 text-sm hover:text-teal-600 hover:underline font-medium rounded-lg float-right items-center justify-end transform transition-all hover:scale-105 duration-300 "
        onClick={sendEmailVerify}
      >
        Verify Your Email
      </button>
      {isCekEmail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg text-center border-t-4 border-teal-500">
            <div className="text-teal-500 items-center mb-4">
              <FaMailBulk />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Check Your Email to Verify
            </h3>
            <p className="mb-6">
              We have sent a verification email to you. Check your inbox and
              click on the verification link.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-gray-500">
                This window will close automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmailVerifyButton;
