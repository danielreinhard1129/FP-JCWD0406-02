import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import CardProductManagement from './components/CardProductManagement';
import HeaderProductDashboard from './components/HeaderProductDashboard';

const ProductManagementSuperAdmin = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderProductDashboard />
        <CardProductManagement />
      </div>
    </div>
  );
};

export default ProductManagementSuperAdmin;
