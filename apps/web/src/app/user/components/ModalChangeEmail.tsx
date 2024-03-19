// EditProfileComp.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner'; // Assuming 'sonner' is your project-specific way to handle notifications
import { baseUrl } from '@/app/utils/database';
import { FaEdit, FaMailBulk, FaUserAlt } from 'react-icons/fa';

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact: number;
  profile_picture?: string;
}

interface EditProfileProps {
  user: Partial<IUser>;
  onSuccess: () => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
});

const ModalChangeEmail: React.FC<EditProfileProps> = ({ user, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCekEmail, setIsCekEmail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.patch(
          `${baseUrl}/users/edituser/${user.id}`,
          values,
        );
        if (response.status === 200) {
          const successMsg = response.data.message;
          toast.success(successMsg);
          onSuccess();
          setIsCekEmail(true);
          setIsModalOpen(false);
          setTimeout(() => {
            setIsCekEmail(false); // Close the verification modal after some time
          }, 5000);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <text
        className="cursor-pointer text-teal-500 text-sm hover:text-teal-600 hover:underline font-medium rounded-lg float-right items-center justify-end transform transition-all hover:scale-105 duration-300 "
        onClick={() => setIsModalOpen(true)}
      >
        Change Email
      </text>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-xl ">
            <h2 className="text-lg font-semibold mb-4">Change Your Email</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="flex gap-5">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-1"
                  >
                    New Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
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
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 ">
                <button
                  type="button"
                  className="px-4 py-1 text-xs text-white bg-gray-500 rounded-xl hover:bg-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs font-normal text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                  disabled={formik.isSubmitting}
                >
                  Change Your Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    </>
  );
};

export default ModalChangeEmail;
