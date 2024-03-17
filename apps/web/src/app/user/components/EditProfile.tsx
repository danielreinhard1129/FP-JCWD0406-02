// EditProfileComp.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner'; // Assuming 'sonner' is your project-specific way to handle notifications
import { baseUrl } from '@/app/utils/database';
import { FaEdit } from 'react-icons/fa';

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
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  contact: yup.number().required('Username is required'),
  // You can add more fields here as necessary
});

const EditProfileComp: React.FC<EditProfileProps> = ({ user, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      username: user?.username || '',
      contact: user?.contact || '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.patch(
          `${baseUrl}/users/edituser/${user.id}`,
          values,
        );
        if (response.status === 200) {
          toast.success('Profile updated successfully');
          onSuccess();
          setIsModalOpen(false);
        } else {
          throw new Error('Failed to update profile');
        }
      } catch (error) {
        toast.error('Failed to update profile');
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <button
        className="bg-amber-100 hover:bg-[#b0cac1] self-center text-teal text-sm font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <FaEdit />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="flex gap-5">
                <div className="flex-1">
                  <label className="font-medium">First Name</label>
                  <input
                    name="first_name"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                  />
                </div>
                <div className="flex-1">
                  <label className="font-medium">Last Name</label>
                  <input
                    name="last_name"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Username</label>
                <input
                  name="username"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </div>
              <div>
                <label className="font-medium">Contact</label>
                <input
                  name="contact"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact}
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-xl hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-normal text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                  disabled={formik.isSubmitting}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileComp;
