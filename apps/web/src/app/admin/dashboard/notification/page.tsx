'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderNotificationSuperAdmin from './components/HeaderNotificationSuperAdmin';
import ReqStockCard from './components/ReqStockCard';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

// These interfaces should ideally be moved to a separate types.ts file
interface IWarehouse {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  name: string;
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

const NotificationSuperAdmin = () => {
  const [requestStock, setRequestStock] = useState<IReqStock[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/req-stock`);
      if (response.data?.data) {
        setRequestStock(response.data.data as IReqStock[]);
      }
    } catch (error) {
      console.error('Error fetching request stock:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-2">
        <HeaderNotificationSuperAdmin />
        {requestStock.map((reqStock) => (
          <ReqStockCard key={reqStock.id} reqStock={reqStock} />
        ))}
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
