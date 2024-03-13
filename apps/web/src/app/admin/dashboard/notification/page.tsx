import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderNotificationSuperAdmin from './components/HeaderNotificationSuperAdmin';

const NotificationSuperAdmin = () => {
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderNotificationSuperAdmin />
        <div>KONTEN DISINI</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
