'use client';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React, { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import HeaderWarehouseOrder from './components/HeaderWarehouseOrder';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import CardOrder from './components/OrderCardWarehouse';
import TabOrderManagementWarehouse from './components/TabOrderManagementWarehouse';

enum TransactionStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  WAITING_PAYMENT_CONFIRMATION = 'WAITING_PAYMENT_CONFIRMATION',
  IN_PROGRESS = 'IN_PROGRESS',
  SHIPPED = 'SHIPPED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  CANCELLED = 'CANCELLED',
}

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
const WarehouseOrder = () => {
  const params = useParams();
  const [orderList, setOrderList] = useState<IOrder[]>([]);

  useEffect(() => {
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

    fetchData();
  }, [params.warehouse]);

  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-2">
        <HeaderWarehouseOrder />
        <TabOrderManagementWarehouse orders={orderList} />
      </div>
    </div>
  );
};

export default WarehouseOrder;
