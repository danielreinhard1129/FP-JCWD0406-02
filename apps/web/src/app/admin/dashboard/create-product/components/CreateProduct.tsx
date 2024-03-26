'use client';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { FileInput, Label } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import SelectOptionCategory from '../../category-management/components/SelectOptionCategory';

const CreateProductForm = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [fileProducts, setFileProducts] = useState<File[]>([]);

  // Function to handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files !== null) {
      const newFiles: File[] = Array.from(files); // Convert FileList to array

      // Append new files to the existing array
      setFileProducts((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...fileProducts];
    updatedFiles.splice(index, 1);
    setFileProducts(updatedFiles);
  };

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('title', event.target.title.value);
      formData.append('description', event.target.description.value);
      formData.append('price', event.target.price.value);
      formData.append('weight', event.target.weight.value);
      formData.append('categoryId', selectedCategoryId);

      fileProducts.forEach((file) => {
        formData.append('files', file);
      });

      // Send POST request to create product
      await axios.post(`${baseUrl}/warehouses/create-product`, formData);

      // Reset form fields and state
      event.target.reset();
      setSelectedCategoryId('');
      setFileProducts([]);

      // Show success message
      toast.success('Product created successfully');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="max-w-6xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
      <h1 className="text-center text-3xl font-bold">CREATE PRODUCT</h1>
      <hr className="m-6" />
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="my-6">
          <label htmlFor="title" className="text-md font-medium">
            Product Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter product name"
            className="rounded-lg form-input mt-1 block w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="my-6">
          <label htmlFor="description" className="text-md font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            rows={4}
            className="rounded-lg form-textarea mt-1 block w-full"
            required
          />
        </div>

        {/* Price */}
        <div className="my-6">
          <label htmlFor="price" className="text-md font-medium">
            Price (IDR)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter product price"
            className="rounded-lg form-input mt-1 block w-full"
            required
          />
        </div>

        {/* Weight */}
        <div className="my-6">
          <label htmlFor="weight" className="text-md font-medium">
            Weight (grams)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter product weight"
            className="rounded-lg form-input mt-1 block w-full"
            required
          />
        </div>

        {/* Category */}
        <div className="my-6">
          <label htmlFor="categoryId" className="text-md font-medium">
            Category
          </label>
          <SelectOptionCategory
            onCategoryChange={setSelectedCategoryId}
            className="rounded-lg form-input mt-1 block w-full"
          />
        </div>

        {/* File Upload */}
        <div className="my-6">
          <Label htmlFor="fileUpload" value="Upload Images" />
          <FileInput
            id="fileUpload"
            name="files"
            multiple
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        {/* Render the FileViewer component */}
        {fileProducts.length > 0 && (
          <div className="my-6 p-4 border border-gray-200 rounded-md">
            <h2 className="font-semibold mb-3">Uploaded Files</h2>
            <ul className="space-y-1">
              {fileProducts.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-t py-1"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <button
                    className="bg-red-600 text-white py-1 px-2 text-xs rounded-lg"
                    onClick={() => handleFileDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
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
