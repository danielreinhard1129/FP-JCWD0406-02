'use client';
import { baseUrl, baseUrll } from '@/app/utils/database';
import { RootState } from '@/lib/store';
import axios from 'axios';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import CardProduct from './components/cardProduct';
import UploadPaymentProof from './components/uploadPaymentProof';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

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

interface ITransactionDetails {
  Product: IProduct;
  weight: number;
  price: number;
  title: string;
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
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

const WaitingForPaymentPage = () => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const params = useParams();
  console.log('di transaksi', transaction);

  useEffect(() => {
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

    // console.log('data ', transaction);

    fetchTransaction();
  }, [params.uuid]);

  if (!transaction) return null;

  const subtotal = transaction.transactionDetails.reduce(
    (acc, detail) => acc + detail.price * detail.quantity,
    0,
  );
  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(subtotal);
  const formattedShippingCost = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(transaction.shippingCost);
  const total = subtotal + transaction.shippingCost;
  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(total);

  return (
    <div className="max-w-xl mx-auto min-h-screen">
      <div>
        <h1 className="text-center text-xl py-5 font-bold">
          Waiting for payment
        </h1>
        <div className=" max-w-5xl mx-auto">
          <Card className="">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <Image
                        alt="User image"
                        height={100}
                        width={100}
                        src={
                          user.profile_picture
                            ? `${baseUrll}/photo-profile/${user.profile_picture}`
                            : '/default-avatar.png'
                        }
                        className="ml-5 rounded-full object-cover w-20 h-20"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {`${user.first_name} ${user.last_name}`}{' '}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <CardProduct transaction={transaction} />
            </div>

            {/* <div>
              <div className="my-4 p-4 bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                <ul>
                  {transaction.transactionDetails.map((detail, index) => (
                    <li key={index} className="flex justify-between text-xs">
                      <span>
                        {detail.title} (x{detail.quantity})
                      </span>
                      <span>Rp {Number(detail.price).toLocaleString()}</span>
                    </li>
                  ))}
                  <li className="flex justify-between my-2 border-t pt-2 text-xs">
                    <span>Subtotal</span>
                    <span>{formattedSubtotal}</span>
                  </li>
                  <li className="flex justify-between my-2 text-xs">
                    <span>Shipping Cost</span>
                    <span>{formattedShippingCost}</span>
                  </li>
                  <li className="flex justify-between my-2 font-bold text-sm">
                    <span>Total Price</span>
                    <span>{formattedTotal}</span>
                  </li>
                </ul>
              </div>
            </div> */}
            <div>
              <UploadPaymentProof transaction={transaction} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WaitingForPaymentPage;
