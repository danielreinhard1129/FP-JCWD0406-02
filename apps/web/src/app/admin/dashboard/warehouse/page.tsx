import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import WarehouseCard from './components/CardWarehouse';
import HeaderWarehouseManagement from './components/HeaderWarehouseManagement';

const Warehouse = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderWarehouseManagement />
        <div className="flex">
          <WarehouseCard />
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
