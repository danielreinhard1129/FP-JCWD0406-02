'use client';
import React, { useState } from 'react';

interface ProductDetails {
  productImage: string;
  productName: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  products: ProductDetails[];
  total: number;
  address: string;
  status: string;
  uuid: string;
}

const OrderCard: React.FC<{ order: OrderDetails }> = ({ order }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  console.log('carddd', order);

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  return (
    <div className="flex flex-wrap items-start gap-2">
      {/* <div className="bg-white rounded-lg shadow-lg p-3 w-full max-w-4xl my-2 border-l-8 border-teal-500">
        {order
          .slice(0, showAllProducts ? order.products.length : 1)
          .map((product, index) => (
            <div key={index} className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                <div className="">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="h-10 w-10 object-cover rounded-l-lg"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="text-xs text-teal-600">
                    {product.quantity} x Rp {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
              {index === 0 && (
                <div className="flex gap-2">
                  <div className="">
                    <button className="text-xs rounded-xl bg-red-500 hover:bg-red-600 text-white font-base py-1 px-3">
                      Decline
                    </button>
                  </div>
                  <div className="">
                    <button className="text-xs rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-4">
                      Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        {order.products.length > 1 && (
          <div className="text-center">
            <button
              onClick={toggleShowAllProducts}
              className="text-xs rounded-xl hover:bg-white text-teal-600 font-light"
            >
              {showAllProducts ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs font-semibold text-gray-800">
              Total Penjualan
            </p>
            <p className="text-sm font-bold text-teal-600">
              Rp{order?.total?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Alamat</p>
            <p className="text-sm text-gray-700">{order.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm text-gray-700">{order.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">uuid</p>
            <p className="text-sm text-gray-700">{order.uuid}</p>
          </div>
        </div>
      </div> */}
      {/* Payment photo section
      {paymentPhoto && (
        <div className="flex flex-initial justify-center my-2 items-center bg-white rounded-lg shadow-lg p-1 border border-gray-200">
          <img
            src={paymentPhoto}
            alt="Payment Proof"
            className="h-28 w-28 object-cover rounded-lg"
          />
        </div>
      )} */}
    </div>
  );
};

export default OrderCard;
