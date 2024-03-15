import { baseUrl, baseUrll } from '@/app/utils/database';
import axios from 'axios';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useState } from 'react';

const CardOrder = (data: any) => {
  console.log('checkk carddd', data.data);
  const dataa = data.data;
  //   console.log('check id', dataa.id);

  const [updateStatus, setUpdateStatus] = useState<string | null>(null); // Explicitly define the type as string or null

  const fetchData = async (status: string) => {
    // Accept status as an argument
    try {
      const result = await axios.patch(
        `${baseUrl}/transactions/update-status/${dataa.id}`,
        {
          TransactionStatus: status,
        },
      ); // Pass status to the request
      setUpdateStatus(status);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>tesss</p>
      <div className="flex-col">
        <div>
          <Image
            src={`${baseUrll}/payment-proof/${dataa.paymentImg}`}
            width={100}
            height={100}
            alt="payment-proof"
          />
        </div>
      </div>
      <text>tess</text>
      <h1>{dataa.uuid}</h1>
      <Button onClick={() => fetchData('ORDER_CONFIRMED')}>Confirm</Button>{' '}
      {/* Pass 'ORDER_CONFIRMED' */}
      <Button onClick={() => fetchData('CANCELLED')}>Cancelled</Button>{' '}
      {/* Pass 'CANCELLED' */}
    </>
  );
};

export default CardOrder;
