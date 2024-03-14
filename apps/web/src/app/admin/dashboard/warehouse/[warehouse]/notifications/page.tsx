'use client';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React from 'react';
import HeaderNotificationWarehouseAdmin from './components/HeaderNotificationWarehouseAdmin';
import StockMutationCard from './components/StockMutationCard';
import { useParams } from 'next/navigation';

const NotificationSuperAdmin = () => {
  const params = useParams();

  console.log('ini param', params);
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderNotificationWarehouseAdmin />
        {/* <StockMutationCard /> */}
        <div>KONTEN DISINI UNTUK YANG WAREHOUSE</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
