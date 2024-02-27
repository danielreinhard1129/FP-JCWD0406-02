'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import YupPassword from 'yup-password';
import { baseUrl } from '@/app/utils/database';
import { FaPlus, FaTimes } from 'react-icons/fa';

YupPassword(yup);

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}

interface CreateAdminProps {
  onSuccess: () => void;
}

const validationSchema = yup.object({
  username: yup.string().required('Username cannot be empty'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
  password: yup.string().required('Password cannot be empty').min(6),
});

const AdminRegisterCard: React.FC<CreateAdminProps> = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${baseUrl}/users/register`, {
          username: values.username,
          email: values.email,
          password: 'admin123',
          roleId: 2,
        });
        setIsModalOpen(false);
        toast.success('Register success');
        resetForm();
        onSuccess();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <div>
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 font-medium text-sm rounded-lg inline-flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mr-2" />
        Register Admin
      </button>
      {isModalOpen && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <button
            className="absolute top-0 right-0 m-4 p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIsModalOpen(false)}
          >
            <FaTimes />
          </button>
          <div className="bg-white px-8 pt-5 md:py-10 md:px-10 rounded-lg">
            {/* Modal content goes here */}

            <h2 className="md:text-3xl text-2xl font-bold text-center">
              Register New Admin
            </h2>
            <p
              className="text-xs
           text-gray-600 text-center mb-2"
            >
              Enter the fields below to create admin account
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.errors.username && formik.touched.username && (
                  <p className="text-sm text-red-600 mt-2">
                    {formik.errors.username}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-sm text-red-600 mt-2">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="admin123"
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white font-normal text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              By clicking continue, you agree to our{' '}
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
      )}
    </div>
  );
};

export default AdminRegisterCard;
