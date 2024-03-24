// components/StatusTabs.tsx
import React, { useState } from 'react';
import CardReqStockStatusDestination from './CardReqStockStatusDestination';

enum NotificationStatus {
  ALL = 'ALL',
  PENDING = 'PENDING',
  CONFIRM = 'CONFIRM',
  CANCELLED = 'CANCELLED',
}
interface Product {
  categoryId: number;
  created_at: string;
  description: string;
  id: number;
  isDeleted: boolean;
  price: number;
  title: string;
  updatedAt: string;
  weight: number;
}

interface RequestStock {
  createdAt: string;
  id: number;
  product: Product;
  productId: number;
  quantity: number;
  status: string;
  updatedAt: string;
  warehouseId: number;
}
interface StatusTabsProps {
  dataReqStock: RequestStock[];
}

const TabReqMutationStatusManagement: React.FC<StatusTabsProps> = ({
  dataReqStock,
}) => {
  const [activeStatus, setActiveStatus] = useState<NotificationStatus>(
    NotificationStatus.ALL,
  );

  const filteredDataReqStock = dataReqStock.filter(
    (reqStock) =>
      activeStatus === NotificationStatus.ALL ||
      reqStock.status === activeStatus,
  );

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {Object.values(NotificationStatus).map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status as NotificationStatus)}
            className={`whitespace-nowrap px-4 py-1 rounded-lg text-xs font-medium border transition-colors duration-300 ${
              activeStatus === status
                ? 'bg-teal-500 text-white border-transparent'
                : 'text-teal-600 bg-white border-teal-300 hover:bg-teal-50'
            }`}
          >
            {status.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredDataReqStock.map((reqStock) => (
          <CardReqStockStatusDestination key={reqStock.id} data={reqStock} />
        ))}
      </div>
    </div>
  );
};

export default TabReqMutationStatusManagement;
