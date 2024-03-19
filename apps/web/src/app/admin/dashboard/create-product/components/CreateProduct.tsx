'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import SelectOptionCategory from '../../category-management/components/SelectOptionCategory';
import { FileInput, Label } from 'flowbite-react';

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
      // Handle errors
      toast.error('Failed to create product');
      console.error('Error creating product:', error);
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
