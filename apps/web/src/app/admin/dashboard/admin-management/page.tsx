import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderAdminManagement from './components/HeaderAdminManagement';
import CardAllUser from '../user-management/components/CardAllUser';

const UserManagement = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderAdminManagement />
        <div className="flex">
          <CardAllUser />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
