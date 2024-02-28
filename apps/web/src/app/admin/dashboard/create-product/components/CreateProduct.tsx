import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner'; // Ensure you have installed and correctly imported sonner for toast notifications
import { baseUrl } from '@/app/utils/database';

interface IProduct {
  title: string;
  description: string;
  price: string;
  weight: string;
  categoryId: string;
}

const CreateProductForm: React.FC = () => {
  const formik = useFormik<IProduct>({
    initialValues: {
      title: '',
      description: '',
      price: '',
      weight: '',
      categoryId: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      price: yup
        .number()
        .required('Price is required')
        .positive('Price must be positive'),
      weight: yup
        .number()
        .required('Weight is required')
        .positive('Weight must be positive'),
      categoryId: yup.string().required('Category is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${baseUrl}/warehouses/create-product`, values);
        toast.success('Product created successfully');
        resetForm();
      } catch (error) {
        toast.error('Failed to create product');
        console.error('Error creating product:', error);
      }
    },
  });

  return (
    <div className="rounded-3xl max-w-6xl mx-auto shadow-md h-fit py-4 px-6">
      <h1 className="text-center text-3xl font-bold">CREATE PRODUCT</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* PRODUCT NAME */}
        <div className="my-6">
          <label htmlFor="title" className="block mb-2 text-md font-medium">
            Product Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            placeholder="Enter product name"
            className="form-input mt-1 block w-full rounded-md"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
          )}
        </div>

        {/* PRODUCT DESCRIPTION */}
        <div className="my-6">
          <label
            htmlFor="description"
            className="block mb-2 text-md font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Enter product description"
            rows={3}
            className="form-textarea mt-1 block w-full rounded-md"
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* PRODUCT PRICE */}
        <div className="my-6">
          <label htmlFor="price" className="block mb-2 text-md font-medium">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            placeholder="Enter product price"
            className="form-input mt-1 block w-full rounded-md"
          />
          {formik.errors.price && formik.touched.price && (
            <p className="text-red-500 text-xs italic">{formik.errors.price}</p>
          )}
        </div>

        {/* PRODUCT WEIGHT */}
        <div className="my-6">
          <label htmlFor="weight" className="block mb-2 text-md font-medium">
            Weight (grams)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            placeholder="Enter product weight in grams"
            className="form-input mt-1 block w-full rounded-md"
          />
          {formik.errors.weight && formik.touched.weight && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.weight}
            </p>
          )}
        </div>

        {/* PRODUCT CATEGORY */}
        <div className="my-6">
          <label
            htmlFor="categoryId"
            className="block mb-2 text-md font-medium"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            className="form-select mt-1 block w-full rounded-md"
          >
            <option value="">Select a category</option>
            <option value="1">Security</option>
            <option value="2">Lighting</option>
            <option value="3">Electrical</option>
            <option value="4">Curtain</option>
            <option value="5">Home & Living</option>
            <option value="6">Pet Series</option>
          </select>
          {formik.errors.categoryId && formik.touched.categoryId && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.categoryId}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
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
