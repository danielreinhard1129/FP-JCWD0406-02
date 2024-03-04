// components/SearchBar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export interface ProductPhoto {
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  productPhoto: ProductPhoto[];
  categoryId: number;
  Category: ICategory;
}

export interface ICategory {
  id: number;
  category_name: string;
}

interface SearchBarProps {
  allProducts: IProduct[];
}

const SearchBar2: React.FC<SearchBarProps> = ({ allProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchResults(filteredProducts);
  };

  const handleSelectProduct = (productId: number) => {
    setSearchResults([]);
    setSearchTerm('');
    router.push(`/products/product/${productId}`);
  };

  return (
    <div className="relative flex w-full max-w-3xl">
      <input
        type="search"
        placeholder="Search product..."
        className="text-sm rounded-l-md pl-2 focus:ring-teal-500 focus:border-teal-500 block w-full border-gray-300"
        onChange={handleSearch}
        value={searchTerm}
      />
      <button
        type="submit"
        className="px-3 rounded-r-md bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
      >
        <FiSearch className="h-5 w-5" />
      </button>
      {searchResults.length > 0 && (
        <ul className="absolute z-10 mt-10 space-y-1 w-full p-2 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
          {searchResults.map((product) => (
            <li
              key={product.id}
              className="flex items-center rounded-lg p-2 hover:bg-teal-200 cursor-pointer text-sm"
              onClick={() => handleSelectProduct(product.id)}
            >
              <FiSearch className="h-4 w-4 text-gray-500 mr-2" />
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar2;
