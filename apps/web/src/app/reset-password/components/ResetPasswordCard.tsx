'use client';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordCard() {
  const router = useRouter();
  const searchToken = useSearchParams();
  const token = searchToken.get('token');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const { password, confirmPassword } = values;
        console.log(values);

        const { data } = await axios.patch(
          `${baseUrl}/users/reset`,
          {
            password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(data);

        alert('reset succes');
        router.push('/login');
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          alert(errorMsg);
        }
      }
    },
  });
  return (
    <div className="relative h-fit md:h-screen">
      {/* Full Picture */}
      <img
        src="/register/register6.jpg"
        alt="Background Visual"
        className="absolute inset-0 w-full h-full object-contain hidden md:block"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>

      {/* Form Section*/}
      <div className="relative flex justify-center items-center h-full">
        <div className="max-w-md w-full bg-white bg-opacity-90 p-8 md:p-10 rounded-xl">
          <h2 className="text-2xl font-bold text-center">
            Reset Your Password?
          </h2>
          <p className="text-xs text-gray-600 text-center mt-1 mb-4">
            Enter new password below to reset your password
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                id="pasword"
                onChange={formik.handleChange}
                placeholder="New Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                onChange={formik.handleChange}
                placeholder="Confirm New Password"
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-normal text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking submit, you agree to our{' '}
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
  );
}