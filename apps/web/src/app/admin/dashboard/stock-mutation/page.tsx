import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderStockMutationSuperAdmin from './components/HeaderStockMutation';
import StockMutation from './components/StockMutation';

const StockMutationPage = () => {
  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderStockMutationSuperAdmin />
        <div className="flex-wrap">
          <StockMutation />
        </div>
      </div>
    </div>
  );
};

export default StockMutationPage;
