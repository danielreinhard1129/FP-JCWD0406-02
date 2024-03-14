import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import React from 'react';
import HeaderNotificationWarehouseAdmin from './components/HeaderNotificationWarehouseAdmin';

const NotificationSuperAdmin = () => {
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderNotificationWarehouseAdmin />
        <div>KONTEN DISINI UNTUK YANG WAREHOUSE</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
