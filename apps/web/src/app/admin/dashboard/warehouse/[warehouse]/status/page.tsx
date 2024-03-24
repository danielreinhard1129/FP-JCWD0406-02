'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouseStatus from './components/HeaderWarehouseStatus';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { useParams } from 'next/navigation';
import CardReqStockStatusDestination from './components/CardReqStockStatusDestination';
import TabReqMutationStatusManagement from './components/TabReqMutationStatusManagement';

interface Product {
  categoryId: number;
  created_at: string;
  description: string;
  id: number;
  isDeleted: boolean;
  price: number;
  title: string;
  updatedAt: string;
  weight: number;
}

interface RequestStock {
  createdAt: string;
  id: number;
  product: Product;
  productId: number;
  quantity: number;
  status: string;
  updatedAt: string;
  warehouseId: number;
}

const WarehouseReqStockStatus = () => {
  const [dataReqStock, setDataReqStock] = useState<RequestStock[]>([]);
  const params = useParams();
  // console.log('check paramss', params.warehouse);
  useEffect(() => {
    const getDataRequestedStocks = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/req-stock-warehouse/${params.warehouse}`,
        );

        setDataReqStock(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataRequestedStocks();
  }, [params.warehouse]);

  console.log('check data', dataReqStock);

  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-1">
        <HeaderWarehouseStatus />
        <TabReqMutationStatusManagement dataReqStock={dataReqStock} />
      </div>
    </div>
  );
};

export default WarehouseReqStockStatus;
