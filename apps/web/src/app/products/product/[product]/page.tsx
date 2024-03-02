// ProductDetailPage.tsx
import React from 'react';
import ProductImageGallery from './components/PhotoSection';
import ProductDetails from './components/ProductDetail';
// Import additional components and types as necessary

const ProductDetailPage: React.FC = () => {
  // Dummy data or fetch real product data
  const product = {
    title: 'Whiskas® Dry Adult Dewasa 7+, Cat food Rasa Mackerel',
    category: 'Cat Food',
    description: 'Complete meal for senior cats with 41 essential nutrients.',
    price: 'Price: $20.00',
    weightOptions: ['1.5 kg', '1 kg', '500 gr'],
    stock: 'In Stock: 50 units',
  };

  const productImages = [
    '/default-product.webp', // Replace with your actual image paths
    '/default-avatar.png',
    '/default-product.webp',
    '/default-avatar.png',
    '/default-product.webp',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        {/* Product Image */}
        <ProductImageGallery images={productImages} altText={product.title} />
        {/* Product Details */}
        <ProductDetails
          title={product.title}
          category={product.category}
          description={product.description}
          price={product.price}
          weightOptions={product.weightOptions}
          stock={product.stock}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
