'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderNotificationSuperAdmin from './components/HeaderNotificationSuperAdmin';
import ReqStockCard from './components/ReqStockCard';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

interface IWarehouse {
  id: number;
  name: string;
  // ... other warehouse fields
}

interface IProduct {
  id: number;
  name: string;
  // ... other product fields
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: string; // Assuming Status is a string enum or similar
}

const NotificationSuperAdmin = () => {
  const [requestStock, setRequestStock] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/req-stock`);
      setRequestStock(response.data.data);
      console.log('check fetch', response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const data = requestStock;
  console.log('data', data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderNotificationSuperAdmin />
        {data?.map((data: any) => <ReqStockCard reqStock={data} />)}
        <div>KONTEN DISINI</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
