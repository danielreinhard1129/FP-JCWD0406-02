import React from 'react';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouseStatus from './components/HeaderWarehouseStatus';

const WarehouseStatistic = () => {
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
