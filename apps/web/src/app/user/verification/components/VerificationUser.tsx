'use client';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const VerificationUser = () => {
  const searchToken = useSearchParams();
  const token = searchToken.get('token');
  const router = useRouter();

  const [verification, setVerification] = useState();
  const verifyAccount = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/users/verification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);
      router.push(`/login`);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-fit md:h-screen">
        {/* Full Picture as Background */}
        <div>
          <Image
            src="/register/register6.jpg"
            alt="Background Visual"
            className="absolute inset-0 w-full h-full object-contain hidden md:block"
            width={500}
            height={500}
            priority
            quality={100}
          />
        </div>
        {/* Overlay with Opacity */}
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>

        {/* Form Section - Centered with Opacity Background */}
        <div className="relative flex justify-center items-center h-full">
          <div className="max-w-md w-full bg-white bg-opacity-90  p-8 md:p-10 rounded-xl">
            <h2 className="text-2xl font-bold text-center">
              Click here to verify your email
            </h2>
            <div className="my-4">
              <button
                type="submit"
                onClick={verifyAccount}
                className="w-full bg-teal-600 text-white font-normal text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Verify
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              By clicking verify, you agree to our{' '}
              <Link href="/tos" className="text-blue-500 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/tnc" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationUser;
