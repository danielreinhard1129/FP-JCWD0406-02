'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouseStatus from './components/HeaderWarehouseStatus';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { useParams } from 'next/navigation';

const WarehouseStatistic = () => {
  const [dataReqStcok, setDataReqStock] = useState();
  const params = useParams();
  console.log('check paramss', params.warehouse);

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

  useEffect(() => {
    getDataRequestedStocks();
  }, []);

  console.log('check data', dataReqStcok);

  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseStatus />
        <h1>INI BGAIAN Status</h1>
      </div>
    </div>
  );
};

export default WarehouseStatistic;
