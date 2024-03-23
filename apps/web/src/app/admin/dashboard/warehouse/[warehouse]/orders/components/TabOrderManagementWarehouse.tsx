import React, { useState } from 'react';
import OrderCardWarehouse from './OrderCardWarehouse';

// Define the enum for TransactionStatus
enum TransactionStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  WAITING_PAYMENT_CONFIRMATION = 'WAITING_PAYMENT_CONFIRMATION',
  IN_PROGRESS = 'IN_PROGRESS',
  SHIPPED = 'SHIPPED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  CANCELLED = 'CANCELLED',
}

// Interfaces for order details and order
interface IOrderDetail {
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
  };
}

interface IOrder {
  id: number;
  uuid: string;
  TransactionStatus: TransactionStatus;
  Warehouse: {
    name: string;
    city: string;
  };
  shippingCost: number;
  totalPrice: number;
  transactionDetails: IOrderDetail[];
  paymentImg?: string;
}

// Props interface for OrderTabsComponent
interface OrderTabsComponentProps {
  orders: IOrder[];
}

// The OrderTabsComponent itself
const TabOrderManagementWarehouse: React.FC<OrderTabsComponentProps> = ({
  orders,
}) => {
  const [activeTab, setActiveTab] = useState<TransactionStatus>(
    TransactionStatus.WAITING_FOR_PAYMENT,
  );

  const getOrdersByStatus = (status: TransactionStatus) => {
    return orders.filter((order) => order.TransactionStatus === status);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {Object.values(TransactionStatus).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-300 ${
              activeTab === status
                ? 'bg-teal-500 text-white border-transparent'
                : 'text-teal-600 bg-white border-teal-300 hover:bg-teal-50'
            }`}
          >
            {status.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      <div className="space-y-2 gap-4">
        {getOrdersByStatus(activeTab).map((order) => (
          <OrderCardWarehouse key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default TabOrderManagementWarehouse;
