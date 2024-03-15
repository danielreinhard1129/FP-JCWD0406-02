import React, { useState } from 'react';
import ProductSelect from '../../warehouse/components/ProductSelect';

interface ProductWithQuantity {
  productId: number;
  quantity: number;
}

const ProductSelectAndQuantity: React.FC = (
  productId: number,
  quantity: number,
) => {
  const [productsWithQuantities, setProductsWithQuantities] = useState<
    ProductWithQuantity[]
  >([{ productId: 0, quantity: 1 }]);

  console.log('ini productquantity', productsWithQuantities);

  const handleProductChange = (index: number, productId: number) => {
    const newProducts = [...productsWithQuantities];
    newProducts[index].productId = productId;
    setProductsWithQuantities(newProducts);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newProducts = [...productsWithQuantities];
    newProducts[index].quantity = quantity;
    setProductsWithQuantities(newProducts);
  };

  const addProductWithQuantity = () => {
    setProductsWithQuantities([
      ...productsWithQuantities,
      { productId: 0, quantity: 1 },
    ]);
  };

  return (
    <div>
      {productsWithQuantities.map((productWithQuantity, index) => (
        <div key={index} className="flex items-center mb-3 gap-2">
          <div className="flex-grow">
            <ProductSelect
              onChange={(productId) => handleProductChange(index, productId)}
            />
          </div>
          <div className="flex-none w-1/4">
            <input
              type="number"
              value={productWithQuantity.quantity}
              onChange={(e) =>
                handleQuantityChange(index, parseInt(e.target.value))
              }
              className="w-full border border-gray-200 rounded p-2"
              min="1"
              placeholder="Qty"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addProductWithQuantity}
        className="mt-2 bg-transparent text-xs text-teal-600 rounded"
      >
        Add Another Product
      </button>
    </div>
  );
};

export default ProductSelectAndQuantity;
