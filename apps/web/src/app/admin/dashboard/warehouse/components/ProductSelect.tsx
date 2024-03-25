import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database'; // Ensure this points to your actual base URL
import { toast } from 'sonner';

interface IProduct {
  id: number;
  title: string;
}

interface ProductSelectProps {
  onChange: (productId: number) => void; // Function to lift state up
}

const ProductSelect: React.FC<ProductSelectProps> = ({ onChange }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);
      setProducts(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    onChange(Number(productId));
  };

  return (
    <select
      value={selectedProductId}
      onChange={handleProductChange}
      required
      className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out"
    >
      <option value="">Select Product</option>
      {products.map((product) => (
        <option key={product.id} value={product.id}>
          {product.title}
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
