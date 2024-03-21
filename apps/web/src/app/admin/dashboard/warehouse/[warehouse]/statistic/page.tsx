import React from 'react';
import HeaderWarehouseStatistic from './components/HeaderWarehouseStatistic';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';

const WarehouseStatistic = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseStatistic />
        <h1>INI BGAIAN STATISTIC</h1>
      </div>
    </div>
  );
};

export default WarehouseStatistic;
