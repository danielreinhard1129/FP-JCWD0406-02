import React from 'react';
import AdminSidebar from './components/SidebarDashboard';
import { CustomerGuard } from '@/components/protected-route/components/CustomerGuard';

const AdminPage = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
    </div>
  );
};

export default CustomerGuard(AdminPage);
