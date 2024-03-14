import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderNotificationSuperAdmin from './components/HeaderNotificationSuperAdmin';
import ReqStockCard from './components/ReqStockCard';

interface IWarehouse {
  id: number;
  name: string;
  // ... other warehouse fields
}

interface IProduct {
  id: number;
  name: string;
  // ... other product fields
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: string; // Assuming Status is a string enum or similar
}

const sampleReqStock: IReqStock = {
  id: 1,
  warehouse: {
    id: 1,
    name: 'Main Warehouse',
    // Other fields can be added here
  },
  product: {
    id: 1,
    name: 'Infinix SMART 6 Plus',
    // Other fields can be added here
  },
  quantity: 15,
  createdAt: '2024-03-14T08:00:00Z',
  updatedAt: '2024-03-14T09:00:00Z',
  status: 'PENDING',
};

const NotificationSuperAdmin = () => {
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderNotificationSuperAdmin />
        <ReqStockCard reqStock={sampleReqStock} />
        <div>KONTEN DISINI</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
