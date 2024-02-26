import React from 'react';

import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouse from './components/HeaderWarehouse';
import CardProductManagement from '../../product-management/components/CardProductManagement';
import WarehouseDetailCard from './components/WarehouseDetailCard';
import AdminIdentityCard from './components/AdminIdentityCard';

const WarehouseDetail = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderWarehouse />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 px-4">
            <WarehouseDetailCard />
            <AdminIdentityCard />
          </div>
          <h1 className="text-xl font-semibold mb-4">Manage Product Stock</h1>
          <CardProductManagement />
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetail;
