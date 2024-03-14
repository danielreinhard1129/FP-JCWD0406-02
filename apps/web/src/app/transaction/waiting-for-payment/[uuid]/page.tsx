'use client';
import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardProduct from './components/cardProduct';
import UploadPaymentProof from './components/uploadPaymentProof';

export interface ITransactionDetails {
  Product: any;
  productPhotos: IProductPhotos[];
  weight: number;
  price: number;
  title: string | undefined;
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
}

interface IProductPhotos {
  photo_product: string;
  productId: number;
}

export interface ITransaction {
  id: number;
  uuid: string;
  userId: number;
  warehouseId: number;
  shippingCost: number;
  totalPrice: number;
  paymentImg: string;
  TransactionStatus: string;
  createdAt: Date;
  updatedAt: Date;
  transactionDetails: ITransactionDetails[];
}

const page = () => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const router = useRouter();
  const params = useParams();

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/transactions/details/${params.uuid}`,
      );

      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('data ', transaction);

  useEffect(() => {
    fetchTransaction();
  }, []);
  // const transactionDetails = transaction.transactionDetails;
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-center pt-5 font-bold">Waiting for payment</h1>
        <div className=" max-w-5xl mx-auto">
          <Card className="">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                List Product
              </h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <Image
                        alt="Neil image"
                        height="32"
                        src="/images/people/profile-picture-1.jpg"
                        width="32"
                        className="rounded-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </li>
              </ul>
              <CardProduct transaction={transaction} />
            </div>
            <div>
              <UploadPaymentProof data={transaction} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
