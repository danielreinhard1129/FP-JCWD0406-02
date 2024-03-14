import React from 'react';
import { ITransaction, ITransactionDetails } from '../page';
import { baseUrl, baseUrll } from '@/app/utils/database';

interface IProduct {
  categoryId: number;
  price: number;
  title: string;
  weight: number;
}
interface Props {
  transaction: ITransaction | null;
}
const CardProduct: React.FC<Props> = ({ transaction }) => {
  // console.log('compp', transaction);

  return (
    <div className="bg-white w-full">
      <div className="mx-auto">
        {transaction &&
          transaction.transactionDetails.map((transactionDetail, index) => (
            <div
              key={index}
              className="mt-4 flex items-center justify-between border pr-5 rounded-lg bg-white shadow"
            >
              <img
                // src={`${baseUrl}/photo-product/${transactionDetail.productPhotos[0].photo_product}`} // Assuming product images are stored with ids as filenames
                alt={transactionDetail.title}
                className="h-28 w-28 object-cover rounded-l-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-md font-medium mr-4">
                  {transactionDetail.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Price: Rp{transactionDetail?.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Weight: {transactionDetail.weight} gram
                </p>
              </div>
              <div className="mr-4">
                <p className="text-sm text-gray-500">
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
