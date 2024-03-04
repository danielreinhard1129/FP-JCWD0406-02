// components/SearchBar.tsx
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Ensure you have react-icons installed

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
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  allProducts,
  setFilteredProducts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  return (
    <div className="flex w-full max-w-3xl">
      <input
        type="search"
        placeholder="Search product..."
        className="text-sm rounded-l-md pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        type="submit"
        className="px-3 rounded-r-md bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
      >
        <FiSearch className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
