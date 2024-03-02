import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample categories and products for illustration
  const categories = ['All', 'Electronics', 'Apparel', 'Home', 'Toys'];
  const products = [
    {
      id: 10,
      name: 'Product 10',
      image: '/default-product.webp',
      price: '299.00',
      category: 'Electronics',
    },
    {
      id: 9,
      name: 'Product 9',
      image: '/default-product.webp',
      price: '599.00',
      category: 'Apparel',
    },
    {
      id: 1,
      name: 'Product 1',
      image: '/default-product.webp',
      price: '299.00',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Product 2',
      image: '/default-product.webp',
      price: '599.00',
      category: 'Apparel',
    },
    {
      id: 3,
      name: 'Product 3',
      image: '/default-product.webp',
      price: '299.00',
      category: 'Electronics',
    },
    {
      id: 4,
      name: 'Product 4',
      image: '/default-product.webp',
      price: '599.00',
      category: 'Apparel',
    },
    {
      id: 5,
      name: 'Product 5',
      image: '/default-product.webp',
      price: '299.00',
      category: 'Electronics',
    },
    {
      id: 6,
      name: 'Product 6',
      image: '/default-product.webp',
      price: '599.00',
      category: 'Apparel',
    },
    {
      id: 7,
      name: 'Product 7',
      image: '/default-product.webp',
      price: '299.00',
      category: 'Electronics',
    },
    {
      id: 8,
      name: 'Product 8',
      image: '/default-product.webp',
      price: '599.00',
      category: 'Apparel',
    },
    // ... other products
  ];
  return (
    <>
      <Head>
        <title>All Product Catalog</title>
      </Head>

      <div className="flex flex-col ">
        {/* Carousel Promo */}
        <div className="carousel h-64 bg-gray-300">{/* ... */}</div>

        {/* Main Content */}
        <div className="grid grid-cols-5 gap-4 mt-4 max-w-7xl mx-auto">
          {/* Category Selector */}
          <aside className="col-span-1 bg-gray-100 p-4 h-fit sticky top-20">
            <ul className="">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer  hover:text-red-500 ${
                    selectedCategory === category
                      ? 'text-red-500 font-bold'
                      : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>

          {/* Products Grid */}
          <section className="col-span-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products
                .filter(
                  (product) =>
                    selectedCategory === 'All' ||
                    product.category === selectedCategory,
                )
                .map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg">
                    {/* Product Card */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      layout="responsive"
                    />
                    <h3 className="mt-2 font-bold">{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
