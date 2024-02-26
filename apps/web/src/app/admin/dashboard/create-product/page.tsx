import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import CreateProductForm from './components/CreateProduct';

const CreateProduct = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <CreateProductForm />
    </div>
  );
};

export default CreateProduct;
