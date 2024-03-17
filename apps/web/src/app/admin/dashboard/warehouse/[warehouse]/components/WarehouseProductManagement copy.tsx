// TabsComponent.tsx
import React, { useState } from 'react';
import CardAllProductWarehouse from './CardAllProductWarehouse';
import CardWarehouseProduct from './CardWarehouseProduct';

export interface IStock {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductPhoto {
  id: number;
  photo_product: string;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

interface TabsComponentProps {
  allProducts: IProduct[];
  inStockProducts: IProduct[];
  noStockProducts: IProduct[];
  warehouseData: number;
  allStock: IStock[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  warehouseData,
  allProducts,
  inStockProducts,
  noStockProducts,
  allStock,
}) => {
  // console.log('comp tabss', allStock);

  const [activeTab, setActiveTab] = useState<'all' | 'inStock' | 'noStock'>(
    'all',
  );

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === 'all'
              ? 'border-b-2 border-teal-500 text-teal-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Products
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'inStock'
              ? 'border-b-2 border-teal-500 text-teal-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('inStock')}
        >
          In Stock
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'noStock'
              ? 'border-b-2 border-teal-500 text-teal-500'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('noStock')}
        >
          Out of Stock
        </button>
      </div>

      <div>
        {activeTab === 'all' && (
          <CardAllProductWarehouse
            warehouseId={warehouseData}
            productsData={allProducts}
            allStock={allStock}
          />
        )}
        {activeTab === 'inStock' && (
          <CardWarehouseProduct productsData={inStockProducts} />
        )}
        {activeTab === 'noStock' && (
          <CardWarehouseProduct productsData={noStockProducts} />
        )}
      </div>
    </div>
  );
};

export default TabsComponent;
