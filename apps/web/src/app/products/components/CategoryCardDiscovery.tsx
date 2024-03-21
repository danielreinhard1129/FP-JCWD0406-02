// CategorySelector.tsx
import React from 'react';
import { Category } from './ProductCard';

interface ICategory {
  id: number;
  category_name: string;
}

interface CategorySelectorProps {
  categories: ICategory[];
  selectedCategory: string; // Selected category ID as a string
  setCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  setCategory,
}) => {
  const handleCategoryChange = (categoryName: string) => {
    setCategory(categoryName);
  };

  return (
    <aside className="col-span-1 bg-white shadow-sm rounded-lg p-4 h-fit sticky top-32 left-10">
      <h1 className="text-lg font-bold mb-4">Choose Category</h1>
      <ul className="space-y-2">
        {/* Option for All Products */}
        <li className="flex items-center">
          <input
            id="category-all"
            type="checkbox"
            className="form-checkbox rounded text-red-500 h-5 w-5"
            checked={selectedCategory === ''}
            onChange={() => handleCategoryChange('')}
          />
          <label
            htmlFor="category-all"
            className="ml-3 cursor-pointer text-gray-700"
          >
            All Products
          </label>
        </li>
        {/* Options for individual categories */}
        {categories.map((category) => (
          <li key={category.id} className="flex items-center">
            <input
              id={`category-${category.id}`}
              type="checkbox"
              className="form-checkbox rounded text-red-500 h-5 w-5"
              checked={selectedCategory === category.category_name} // Compare with selectedCategory
              onChange={() => handleCategoryChange(category.category_name)} // Pass the category's unique identifier
            />
            <label
              htmlFor={`category-${category.id}`}
              className="ml-3 cursor-pointer text-gray-700"
            >
              {category.category_name}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySelector;
