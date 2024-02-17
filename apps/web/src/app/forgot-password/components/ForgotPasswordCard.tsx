'use client';
import Link from 'next/link';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';

export default function ForgotPasswordCard() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      // TODO: Implement forgot password functionality.
      try {
        const { email } = values;

        const { data } = await axios.post(`${baseUrl}/users/forgot-password`, {
          email,
        });

        alert('Forgot succes, Please Check your email');
        // router.push('/login');
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
      {/* Full Picture as Background */}
      <img
        src="/register/register6.jpg"
        alt="Background Visual"
        className="absolute inset-0 w-full h-full object-contain hidden md:block"
      />

      {/* Overlay with Opacity */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div>

      {/* Form Section - Centered with Opacity Background */}
      <div className="relative flex justify-center items-center h-full">
        <div className="max-w-md w-full bg-white bg-opacity-90 p-8 md:p-10 rounded-xl">
          <h2 className="text-2xl font-bold text-center">
            Forgot Your Password?
          </h2>
          <p className="text-xs text-gray-600 text-center mt-1 mb-4">
            Enter Email below to reset your password
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
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
