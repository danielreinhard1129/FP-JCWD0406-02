// components/NotificationTabsComponent.tsx
import React, { useState } from 'react';
import InitialWarehouseCard from './InitialWarehouseCard';

enum NotificationStatus {
  ALL = 'ALL',
  INPROGRESS = 'INPROGRESS',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  SUCCESS = 'SUCCESS',
}
interface IProductDetail {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    id: number;
    title: string;
  };
}

interface IRequestWarehouse {
  id: number;
  name: string;
  city: string;
  contact: string;
}

interface IStockMutation {
  id: number;
  initialWarehouseId: number;
  destinationWarehouseId: number;
  createdAt: Date;
  updatedAt: Date;
  destinationWarehouse: IRequestWarehouse;
  status: string;
  stockMutationDetail: IProductDetail[];
}

interface NotificationTabsComponentProps {
  notifications: IStockMutation[];
}

const TabsNotificationManagementWarehouse: React.FC<
  NotificationTabsComponentProps
> = ({ notifications }) => {
  const [activeTab, setActiveTab] = useState<NotificationStatus>(
    NotificationStatus.ALL,
  );

  const getNotificationsByStatus = (status: NotificationStatus) => {
    if (status === NotificationStatus.ALL) {
      return notifications;
    }
    return notifications.filter(
      (notification) => notification.status === status,
    );
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {Object.values(NotificationStatus).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-300 ${
              activeTab === status
                ? 'bg-teal-500 text-white border-transparent'
                : 'text-teal-600 bg-white border-teal-300 hover:bg-teal-50'
            } `}
          >
            {status.replace(/INPROGRESS/g, 'IN PROGRESS')}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {getNotificationsByStatus(activeTab).map((notification) => (
          <InitialWarehouseCard key={notification.id} mutation={notification} />
        ))}
      </div>
    </div>
  );
};

export default TabsNotificationManagementWarehouse;
