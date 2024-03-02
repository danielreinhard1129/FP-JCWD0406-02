'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import SelectOptionCategory from '../../category-management/components/SelectOptionCategory';
import { LuImagePlus } from 'react-icons/lu';
// Adjust the import path as necessary

const validationSchema = yup.object({
  title: yup.string().required('Product title is required'),
  description: yup.string().required('Product description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Product price is required'),
  weight: yup
    .number()
    .positive('Weight must be positive')
    .required('Product weight is required'),
  categoryId: yup
    .number()
    .moreThan(0, 'Please select a category')
    .required('Product category is required'),
});

const CreateProductForm = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      weight: '',
      categoryId: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const parsedCategoryId = parseInt(selectedCategoryId, 10);
        const payload = {
          ...values,
          price: parseFloat(values.price),
          weight: parseFloat(values.weight),
          categoryId: parsedCategoryId,
        };
        await axios.post(`${baseUrl}/warehouses/create-product`, payload);
        toast.success('Product created successfully');
        formik.resetForm();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <div className="max-w-6xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
      <h1 className="text-center text-3xl font-bold">CREATE PRODUCT</h1>
      <hr className="m-6" />
      <form onSubmit={formik.handleSubmit}>
        <div className="my-6 md:flex md:items-center md:justify-between">
          <div className="flex flex-col md:mr-4">
            <label
              htmlFor="title"
              className="text-md font-medium md:text-lg md:font-semibold"
            >
              Product Name
            </label>
            <span className="text-xs font-thin">
              Use a clear and concise name for your product, avoiding excessive
              capitalization. Make sure the product name isnt same
            </span>
          </div>
          <div className="w-full md:max-w-xl">
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="BORDL Smart Bohlam 12W"
              className="rounded-lg form-input mt-1 block w-full"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600 mt-2 text-sm">
                {formik.errors.title}
              </div>
            )}
          </div>
        </div>

        <div className="my-6 md:flex md:items-center md:justify-between">
          <div className="flex flex-col md:mr-4">
            <label
              htmlFor="description"
              className="text-md font-medium md:text-lg md:font-semibold"
            >
              Description
            </label>
            <span className="text-xs font-thin">
              Provide as much detail as possible about the product.
            </span>
          </div>
          <div className="w-full md:max-w-xl">
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder="Detailed description of the product."
              rows={4}
              className="rounded-lg form-textarea mt-1 block w-full"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600 mt-2 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
        </div>

        <div className="my-6 md:flex md:items-center md:justify-between">
          <div className="flex flex-col md:mr-4">
            <label
              htmlFor="price"
              className="text-md font-medium md:text-lg md:font-semibold"
            >
              Price
            </label>
            <span className="text-xs font-thin">
              Enter the product price in Rupiah.
            </span>
          </div>
          <div className="w-full md:max-w-xl">
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder="399000"
              className="rounded-lg form-input mt-1 block w-full"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-600 mt-2 text-sm">
                {formik.errors.price}
              </div>
            )}
          </div>
        </div>
        <div className="my-6 md:flex md:items-center md:justify-between">
          <div className="flex flex-col md:mr-4">
            <label
              htmlFor="weight"
              className="text-md font-medium md:text-lg md:font-semibold"
            >
              Weight
            </label>
            <span className="text-xs font-thin">
              Specify the weight in grams (gr).
            </span>
          </div>
          <div className="w-full md:max-w-xl">
            <input
              id="weight"
              name="weight"
              type="number"
              min="0.01"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.weight}
              placeholder="0.5"
              className="rounded-lg form-input mt-1 block w-full"
            />
            {formik.touched.weight && formik.errors.weight && (
              <div className="text-red-600 mt-2 text-sm">
                {formik.errors.weight}
              </div>
            )}
          </div>
        </div>
        <div className="my-6 md:flex items-center md:justify-between">
          <label
            htmlFor="categoryId"
            className="text-md font-medium md:text-lg md:font-semibold"
          >
            Category
          </label>
          <SelectOptionCategory
            onCategoryChange={(value) => {
              setSelectedCategoryId(value);
              formik.setFieldValue('categoryId', value);
            }}
            className="pl-3 pr-10 py-2 text-base sm:text-sm rounded-lg form-input mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
          />
        </div>
        <div className="my-6">
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <LuImagePlus className="mb-3 w-10 h-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">Insert picture</p>
              </div>
              <input
                id="image-upload"
                name="image-upload"
                type="file"
                className="hidden"
                multiple
                // onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-lg"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
