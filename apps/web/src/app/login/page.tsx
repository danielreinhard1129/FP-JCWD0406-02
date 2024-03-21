import React from 'react';
import CardLogin from './components/CardLogin';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-4">
        <CardLogin />
        <div className="flex flex-col items-center ">
          {/* <Image
            src="/loginPic/headlogin1.jpeg"
            alt="Login Visual"
            className="mb-3 "
            width={500}
            height={500}
            priority
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
