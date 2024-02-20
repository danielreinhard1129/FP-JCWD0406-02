import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'sonner'; // Asumsi Anda menggunakan react-toastify untuk notifikasi
import { baseUrl } from '@/app/utils/database';
import { useSelector } from 'react-redux';
import { IAddress } from '../page';

const validationSchema = yup.object({
  name: yup.string().required('Recipient name is required'),
  contact: yup.string().required('Contact is required'),
  street: yup.string().required('Street is required'),
  distric: yup.string().required('District is required'),
  city: yup.string().required('City is required'),
  province: yup.string().required('Province is required'),
  postal_code: yup
    .number()
    .required('Postal code is required')
    .positive()
    .integer(),
});

const CreateAddress = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.user.id); // Ganti `any` dengan `RootState` jika Anda telah mendefinisikan tipe state global
  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      street: '',
      distric: '',
      city: '',
      province: '',
      postal_code: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const intUserId = parseInt(userId, 10);
        if (!isNaN(intUserId)) {
          const payload = {
            userId: intUserId,
            name: values.name,
            contact: values.contact,
            street: values.street,
            distric: values.distric,
            city: values.city,
            province: values.province,
            postal_code: parseInt(values.postal_code, 10),
          };
          await axios.post(`${baseUrl}/users/add-address`, payload);
          toast.success('Address added successfully');
          setIsEditModalOpen(false);
        } else {
          toast.error('Invalid user ID');
        }
      } catch (error) {
        toast.error('Failed to add address');
        console.error(error);
      }
    },
  });

  return (
    <div>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="bg-teal-600 text-white flex items-center font-semibold text-md py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
      >
        <FaPlus className="mr-2" /> Add Address
      </button>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50  flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <form
              className="space-y-4 max-w-2xl"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="font-bold">Add Your Address</h1>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <input
                    name="name"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <input
                    name="contact"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Street</label>
                <input
                  name="street"
                  placeholder=""
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
              </div>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">District</label>
                  <input
                    name="distric"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.distric}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    name="city"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">Province</label>
                  <input
                    name="province"
                    placeholder=""
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.province}
                  />
                </div>
                <div className="">
                  <label className="text-sm font-medium">Postal Code</label>
                  <input
                    name="postal_code"
                    placeholder=""
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postal_code}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-700"
                >
                  Later
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 w-20 font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAddress;
