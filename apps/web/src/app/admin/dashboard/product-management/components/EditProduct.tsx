'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import { FaEdit } from 'react-icons/fa';
import { IStock, ProductPhoto } from '@/types/warehouse.types';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  totalQuantity: number;
  Stock: IStock[];
}

interface EditProductProps {
  product: IProduct;
  onSuccess: () => void;
}

const validationSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  price: yup.number().positive(),
  weight: yup.number().positive(),
});

const EditProduct: React.FC<EditProductProps> = ({ product, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      weight: product.weight,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.patch(
          `${baseUrl}/warehouses/edit-product/${product.id}`,
          values,
        );
        toast.success('Product updated successfully');
        onSuccess();
        setIsModalOpen(false);
      } catch (error) {
        toast.error('Failed to update product');
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <FaEdit className="mr-3" /> Edit
      </li>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            style={{ backdropFilter: 'blur(3px)' }}
          >
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    readOnly // This makes the field read-only
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 cursor-not-allowed"
                    value={formik.values.title}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium mb-2"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium mb-2"
                  >
                    Weight
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="py-2 px-4 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProduct;
