'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import OrderCard from './components/OrderCard';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import HeaderOrderManagement from './components/HeaderOrderManagement';

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

const NotificationSuperAdmin = () => {
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions/order-list`);

      console.log('structure order card', response.data);
      setOrderList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 min-h-screen mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-2">
        <HeaderOrderManagement />
        {orderList.map((order) => (
          <OrderCard key={order.id} order={order} /> // Pass the order as a prop
        ))}
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
