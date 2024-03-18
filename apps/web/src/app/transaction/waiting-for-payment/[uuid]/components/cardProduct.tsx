import React from 'react';
import { ITransaction } from '../page';
import { baseUrl, baseUrll } from '@/app/utils/database';
import Image from 'next/image';

interface IProductPhotos {
  photo_product: string;
  productId: number;
}

interface IProduct {
  categoryId: number;
  price: number;
  title: string;
  weight: number;
  productPhotos: IProductPhotos[];
}

interface Props {
  transaction: ITransaction | null;
}
const CardProduct: React.FC<Props> = ({ transaction }) => {
  if (!transaction) {
    // Render nothing or a placeholder when there is no transaction
    return null;
  }
  console.log('di card', transaction);

  return (
    <div className="bg-white w-full mt-5">
      <div className="mx-auto">
        {transaction?.transactionDetails.map((transactionDetail, index) => (
          <div
            key={index}
            className="my-2 flex items-center justify-between border  rounded-lg bg-white shadow"
          >
            <Image
              src={
                transactionDetail.Product.productPhotos?.[0]?.photo_product
                  ? `${baseUrll}/photo-product/${transactionDetail.Product.productPhotos[0].photo_product}`
                  : '/default-product-image.jpg'
              } // Provide a default image if there's no photo
              alt={transactionDetail.Product.title}
              className="h-20 w-20 object-cover rounded-l-lg mr-4"
              width={100}
              height={100}
            />
            <div className="flex-grow">
              <h3 className="text-xs font-medium mr-4">
                {transactionDetail.Product.title}
              </h3>
              <p className="text-xs text-gray-500">
                Price: Rp{transactionDetail.Product.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Weight: {transactionDetail.Product.weight} grams
              </p>
            </div>
            <div className="mr-4">
              <p className="text-xs text-gray-500">
                Quantity: {transactionDetail.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProduct;
