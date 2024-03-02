// ProductDetails.tsx
import React from 'react';

interface ProductDetailsProps {
  title: string;
  category: string;
  description: string;
  price: string;
  weightOptions: string[];
  stock: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  category,
  description,
  price,
  weightOptions,
  stock,
}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-sm uppercase text-gray-500">{category}</div>
      <p className="text-gray-700">{description}</p>
      <div className="text-lg font-semibold">{price}</div>
      <div>
        {weightOptions.map((weight, index) => (
          <span key={index} className="text-sm mr-2">
            {weight}
          </span>
        ))}
      </div>
      <div className="text-green-600">{stock}</div>
      {/* Add to cart and quantity selection would go here */}
    </div>
  );
};

export default ProductDetails;
