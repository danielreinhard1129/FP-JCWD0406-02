'useclient';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { baseUrl } from '@/app/utils/database'; // Adjust the import path as necessary
import { toast } from 'sonner'; // Assuming you have a toast notification system

// Validation schema
const validationSchema = yup.object({
  categoryName: yup.string().required('Category name cannot be empty'),
});

interface CreateCategoryModalProps {
  onSuccess: () => void; // Add this prop to refresh categories list
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${baseUrl}/warehouses/create-category`, {
          category_name: values.categoryName,
        });
        toast.success('Category created successfully');
        formik.resetForm();
        onSuccess();
        setIsModalOpen(false); // Optionally, invoke a parent component callback to refresh the category list
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          toast.error(errorMsg);
        }
      }
    },
  });

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 font-medium text-sm rounded-lg inline-flex items-center"
      >
        <FaPlus className="mr-2" />
        Create Category
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-72 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold  text-gray-900">
                Create New Category
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <input
                id="categoryName"
                name="categoryName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryName}
                placeholder="Category name"
                className="font-normal mt-2 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className="text-red-600 text-xs pl-1 font-normal mt-1">
                  {formik.errors.categoryName}
                </div>
              ) : null}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-normal text-sm py-2 px-4 rounded-lg"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCategoryModal;
