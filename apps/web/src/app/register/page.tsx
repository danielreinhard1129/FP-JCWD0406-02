'use client';
import React, { useEffect } from 'react';
import RegisterCardInputEmail from './components/RegisterCardInputEmail';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      router.push('/');
    }
  });
  return (
    <div>
      <div className="max-w-7xl min-h-screen mx-auto">
        <RegisterCardInputEmail />
      </div>
    </div>
  );
};

export default RegisterPage;
