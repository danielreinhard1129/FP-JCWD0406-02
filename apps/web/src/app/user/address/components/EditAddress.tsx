// EditAddressComp.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';

interface IAddress {
  id: number;
  userId: number;
  name: string;
  contact: string;
  street: string;
  distric: string;
  city: string;
  province: string;
  postal_code: number;
}

interface EditAddressProps {
  address: IAddress;
  onSuccess: () => void;
}
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
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

const EditAddressComp: React.FC<EditAddressProps> = ({
  address,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: address.name,
      contact: address.contact,
      street: address.street,
      distric: address.distric,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
    } as FormikValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios.patch(`${baseUrl}/users/edit-address/${address.id}`, {
          ...values,
          postal_code: parseInt(values.postal_code, 10),
        });

        toast.success('Address updated successfully');

        onSuccess();
        setIsModalOpen(false);
        resetForm({
          values: { ...values, postal_code: values.postal_code },
        });
        setSubmitting(false);
      } catch (error) {
        toast.error('Failed to update address');
        console.error(error);
      }
    },
  });

  return (
    <>
      <button
        className="bg-transparent w-full mr-1 hover:bg-teal-700 text-teal-600 font-normal text-xs hover:text-white py-1 px-4 border hover:border-transparent rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4">Edit Address</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <input
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <input
                    name="contact"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Street</label>
                <textarea
                  name="street"
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                />
              </div>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">District</label>
                  <input
                    name="distric"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.distric}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    name="city"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="">
                  <label className="text-sm font-medium">Province</label>
                  <input
                    name="province"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.province}
                  />
                </div>
                <div className="">
                  <label className="text-sm font-medium">Postal Code</label>
                  <input
                    name="postal_code"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.postal_code}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-xl hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Later
                </button>
                <button
                  className="px-4 py-2 text-sm font-normal text-white bg-teal-600 rounded-xl hover:bg-teal-700"
                  type="submit"
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

export default EditAddressComp;
