'use client';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React, { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import HeaderWarehouseOrder from './components/HeaderWarehouseOrder';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import CardOrder from './components/CardOrder';

const NotificationSuperAdmin = () => {
  const params = useParams();
  const [orderList, setOrderList] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/transactions/order-list/${params.warehouse}`,
      );
      setOrderList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('orderrr', orderList?.data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseOrder />
        {/* <StockMutationCard /> */}
        <div>
          {orderList?.data?.map((data: any) => <CardOrder data={data} />)}
        </div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
