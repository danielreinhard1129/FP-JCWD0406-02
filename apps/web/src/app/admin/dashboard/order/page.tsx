import React from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import OrderManagement from './components/OrderManagement';
import OrderCard from './components/OrderCard';

interface ProductDetails {
  productImage: string;
  productName: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  products: ProductDetails[];
  total: number;
  address: string;
  status: string;
  uuid: string;
}
const orderDetails: OrderDetails = {
  products: [
    {
      productName: 'Infinix SMART 6 Plus 3/64GB Extended RAM - Black',
      productImage: '/default-product.webp',
      price: 1050000,
      quantity: 3,
    },
    {
      productName: 'Infinix SMART 6 Plus 3/64GB Extended RAM - Black',
      productImage: '/default-product.webp',
      price: 300000,
      quantity: 1,
    },
    {
      productName: 'Infinix SMART 6 Plus 3/64GB Extended RAM - Black',
      productImage: '/default-product.webp',
      price: 950000,
      quantity: 3,
    },
  ],
  total: 1050000, // Update total if you add more products
  address: 'Lutfan Fadillah [Address Details Here]',
  status: 'Waiting For Payment',
  uuid: '00525239895215',
};

const paymentPhotoUrl = '/default-avatar.png';

const NotificationSuperAdmin = () => {
  return (
    <div className="flex h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <OrderManagement />
        <OrderCard order={orderDetails} paymentPhoto={paymentPhotoUrl} />
        <div>KONTEN DISINI</div>
      </div>
    </div>
  );
};

export default NotificationSuperAdmin;
