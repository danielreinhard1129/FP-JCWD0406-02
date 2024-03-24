import React from 'react';
import HeaderWarehouseStatistic from './components/HeaderWarehouseStatistic';
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import SalesPickerByWarehouse from './components/SalesPickerByWarehouse';
import SalesPickerCategoryWarehouse from './components/SalesPickerCategoryWarehouse';
import SalesPickerProductWarehouse from './components/SalesPickerProductWarehouse';

const WarehouseStatistic = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseStatistic />
        <SalesPickerByWarehouse />
        <SalesPickerCategoryWarehouse />
        <SalesPickerProductWarehouse />
      </div>
    </div>
  );
};

export default WarehouseStatistic;
