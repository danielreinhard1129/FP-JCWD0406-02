// ProductSelect.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust the import path as needed
import { toast } from 'sonner'; // Adjust the import path as needed

interface IProduct {
  id: number;
  title: string; // Adjusted to use title
}

const ProductSelectOptionByName: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductTitle, setSelectedProductTitle] = useState<string>('');

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);
      setProducts(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductTitle(event.target.value);
    // Now selectedProductTitle holds the title of the selected product
    // You can call a function to filter products based on the selected product title
    // onProductSelect(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="product-select"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Select Product:
      </label>
      <select
        id="product-select"
        value={selectedProductTitle}
        onChange={handleProductChange}
        className="p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.title}>
            {product.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelectOptionByName;
