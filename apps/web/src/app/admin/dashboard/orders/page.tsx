'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import OrderCard from './components/OrderCard';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import HeaderOrderManagement from './components/HeaderOrderManagement';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';
import TabOrderManagement from './components/TabOrderManagement';
import { toast } from 'sonner';

interface IOrderDetail {
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
  };
}
enum TransactionStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  WAITING_PAYMENT_CONFIRMATION = 'WAITING_PAYMENT_CONFIRMATION',
  IN_PROGRESS = 'IN_PROGRESS',
  SHIPPED = 'SHIPPED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  CANCELLED = 'CANCELLED',
}

interface IOrder {
  id: number;
  uuid: string;
  TransactionStatus: TransactionStatus;
  Warehouse: {
    name: string;
    city: string;
  };
  shippingCost: number;
  totalPrice: number;
  transactionDetails: IOrderDetail[];
  paymentImg?: string;
}

const OrderSuperAdmin = () => {
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions/order-list`);

      setOrderList(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
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
        <TabOrderManagement orders={orderList} />
      </div>
    </div>
  );
};

export default AuthGuard(OrderSuperAdmin);
