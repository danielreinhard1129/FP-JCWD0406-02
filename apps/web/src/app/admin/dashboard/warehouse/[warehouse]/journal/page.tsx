import React from 'react';

import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouseJournal from './components/HeaderWarehouseStatistic';

const WarehouseJournal = () => {
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderWarehouseJournal />
        <h1>INI BGAIAN Journal</h1>
      </div>
    </div>
  );
};

export default WarehouseJournal;
