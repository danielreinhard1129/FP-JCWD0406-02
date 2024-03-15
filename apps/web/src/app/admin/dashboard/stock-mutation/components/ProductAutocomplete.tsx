import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

interface IProduct {
  id: number;
  name: string;
  price: number;
}

interface ProductAutoCompleteProps {
  onProductSelect: (productId: number) => void;
}

const ProductAutoComplete: React.FC<ProductAutoCompleteProps> = ({
  onProductSelect,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  console.log('dapat', products);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);

      setProducts(response.data.data); // Adjust according to actual response structure
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data.message || error.message;
        toast.error(errorMsg);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    searchTerm.length > 0
      ? products.filter(
          (product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (productId: number) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setSearchTerm(product.name);
      onProductSelect(productId);
      setShowOptions(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out"
        placeholder="Search for a product..."
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)} // Delay to allow option click to register
      />
      {showOptions && filteredProducts.length > 0 && (
        <div className="absolute z-10 space-y-1 w-full p-2 bg-white border border-gray-300 max-h-60 overflow-auto rounded-xl">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOptionClick(product.id)}
              className="flex items-center rounded-lg p-2 hover:bg-teal-200 cursor-pointer text-sm"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductAutoComplete;
