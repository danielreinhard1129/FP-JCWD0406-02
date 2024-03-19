'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderNotificationWarehouseAdmin from './components/HeaderNotificationWarehouseAdmin';
import { baseUrl } from '@/app/utils/database';
import InitialWarehouseCard from './components/InitialWarehouseCard';

interface IProductDetail {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    id: number;
    title: string;
  };
}

interface IRequestWarehouse {
  id: number;
  name: string;
  city: string;
  contact: string;
}

interface IStockMutation {
  id: number;
  initialWarehouseId: number;
  destinationWarehouseId: number;
  createdAt: Date;
  updatedAt: Date;
  destinationWarehouse: IRequestWarehouse;
  status: string;
  stockMutationDetail: IProductDetail[];
}

const NotificationInitialWarehouse = () => {
  const [stockMutations, setStockMutations] = useState<IStockMutation[]>([]);
  const params = useParams();
  console.log(stockMutations);

  useEffect(() => {
    const fetchStockMutations = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/get-mutation-by-initial-warehouse/${params.warehouse}`,
        );

        setStockMutations(response.data.data);
      } catch (error) {
        console.error('Error fetching stock mutations:', error);
      }
    };

    if (params.warehouse) {
      fetchStockMutations();
    }
  }, [params.warehouse]);

  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-1">
        <HeaderNotificationWarehouseAdmin />
        {stockMutations.map((mutation) => (
          <InitialWarehouseCard key={mutation.id} mutation={mutation} />
        ))}
      </div>
    </div>
  );
};

export default NotificationInitialWarehouse;
