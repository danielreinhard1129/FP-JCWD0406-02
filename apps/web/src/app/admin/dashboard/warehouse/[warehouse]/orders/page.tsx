'use client';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React, { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import HeaderWarehouseOrder from './components/HeaderWarehouseOrder';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import CardOrder from './components/OrderCardWarehouse';

interface IOrderDetail {
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
  };
}

interface IOrder {
  id: number;
  uuid: string;
  TransactionStatus: string;
  Warehouse: {
    name: string;
    city: string;
  };
  shippingCost: number;
  totalPrice: number;
  transactionDetails: IOrderDetail[];
  paymentImg?: string;
}
const WarehouseOrder = () => {
  const params = useParams();
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/transactions/order-list/${params.warehouse}`,
      );

      setOrderList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-2">
        <HeaderWarehouseOrder />
        {orderList?.map((order) => (
          <CardOrder key={order.id} order={order} /> // Pass the order as a prop
        ))}
      </div>
    </div>
  );
};

export default WarehouseOrder;
