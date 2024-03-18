import React from 'react';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

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
        toast.success(successMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={sendEmailVerify}>Verify your email</Button>
    </div>
  );
};

export default SendEmailVerifyButton;
