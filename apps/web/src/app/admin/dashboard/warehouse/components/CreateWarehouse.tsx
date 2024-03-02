'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner'; // Adjust based on your toast notification utility
import { baseUrl } from '@/app/utils/database'; // Adjust based on your API base URL

// Define the validation schema
const validationSchema = yup.object({
  name: yup.string().required('Warehouse name is required'),
  contact: yup.string().required('Contact is required'),
  road: yup.string().required('Street is required'),
  subdistrict: yup.string().required('District is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('Province is required'),
  postcode: yup
    .number()
    .required('Postal code is required')
    .positive()
    .integer(),
  village: yup.string().required('Village is required'),
});

const CreateWarehouseForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      road: '',
      subdistrict: '',
      city: '',
      state: '',
      postcode: '',
      village: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const parsedValues = {
        ...values,
        postcode: parseInt(values.postcode, 10),
      };
      try {
        const response = await axios.post(
          `${baseUrl}/warehouses/create-warehouse`,
          values,
        );
        console.log(response.data);
        toast.success('Warehouse created successfully');
        setIsModalOpen(false); // Close modal on successful submission
        formik.resetForm(); // Reset form values
      } catch (error) {
        console.error('Error creating warehouse:', error);
        toast.error('Failed to create warehouse');
      }
    },
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 font-medium text-sm rounded-lg inline-flex items-center"
      >
        <FaPlus className="mr-2" />
        Create Warehouse
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-14 mx-auto p-8 border w-3/4 md:w-1/2 lg:w-2/4 shadow-lg rounded-xl bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl leading-6 font-bold text-gray-900">
                Create New Warehouse
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <form className="space-y-2 mt-4" onSubmit={formik.handleSubmit}>
              {/* Form fields here */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Warehouse Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact}
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.contact}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="road"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jalan
                </label>
                <textarea
                  name="road"
                  id="road"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.road}
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {formik.touched.road && formik.errors.road && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.road}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    htmlFor="village"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kelurahan
                  </label>
                  <input
                    type="text"
                    name="village"
                    id="village"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.village}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.village && formik.errors.village && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.village}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    htmlFor="subdistrict"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="subdistrict"
                    id="subdistrict"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subdistrict}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.subdistrict && formik.errors.subdistrict && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.subdistrict}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kota
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Provinsi
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {formik.touched.state && formik.errors.state && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.state}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="postcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kode Pos
                </label>
                <input
                  type="number"
                  name="postcode"
                  id="postcode"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postcode}
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {formik.touched.postcode && formik.errors.postcode && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.postcode}
                  </p>
                )}
              </div>

              {/* Similar structure for other fields */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Create Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWarehouseForm;
