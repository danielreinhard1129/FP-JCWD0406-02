import React from 'react';

interface ICategory {
  id: number;
  category_name: string;
}

interface MobileCategorySelectorProps {
  categories: ICategory[];
  selectedCategory: string;
  setCategory: (category: string) => void;
}

const MobileCategorySelector: React.FC<MobileCategorySelectorProps> = ({
  categories,
  selectedCategory,
  setCategory,
}) => {
  return (
    <div className="block md:hidden px-4 sticky top-32">
      <select
        className="form-select block w-full mt-1 border-collapse rounded-lg px-4 py-2"
        value={selectedCategory}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Products</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MobileCategorySelector;
