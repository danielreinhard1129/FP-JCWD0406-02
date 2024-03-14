'use client';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React from 'react';

import { useParams } from 'next/navigation';
import HeaderWarehouseOrder from './components/HeaderWarehouseOrder';

const NotificationSuperAdmin = () => {
  const params = useParams();

  console.log('ini param', params);
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseOrder />
        {/* <StockMutationCard /> */}
        <div>KONTEN ORDERDISINI UNTUK YANG WAREHOUSE</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
