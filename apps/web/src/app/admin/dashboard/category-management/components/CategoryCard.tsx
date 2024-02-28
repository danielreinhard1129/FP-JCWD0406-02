// CategoryCard.tsx
import React from 'react';
import DeleteCategory from './DeleteCategory'; // Assuming DeleteCategory is similar to DeleteUser but for categories

interface ICategory {
  id: number;
  category_name: String;
  // Add any other relevant fields your category might have
}

interface Props {
  categories: ICategory[];
  refreshCategories: () => void;
}

const CategoryCard: React.FC<Props> = ({ categories, refreshCategories }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative bg-amber-100 shadow rounded-xl mx-1 my-2 max-w-xs w-fit"
        >
          <div className="absolute right-1 top-1 flex items-center space-x-2">
            <DeleteCategory
              categoryId={category.id}
              onSuccess={refreshCategories}
            />
          </div>

          <div className="px-8 py-2">
            <div className="font-semibold text-lg text-teal-600">
              {category.category_name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
