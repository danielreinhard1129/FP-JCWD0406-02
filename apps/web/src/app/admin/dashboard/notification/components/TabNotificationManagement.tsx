// components/NotificationTabsComponent.tsx
import React, { useState } from 'react';
import ReqStockCard from './ReqStockCard';

interface IWarehouse {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  title: string;
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  status: string;
  updatedAt: string;
}
enum NotificationStatus {
  ALL = 'ALL',
  PENDING = 'PENDING',
  CONFIRM = 'CONFIRM',
  CANCELLED = 'CANCELLED',
}
const TabsNotificationManagement: React.FC<{
  reqStocks: IReqStock[];
  fetchData: () => void;
}> = ({ reqStocks, fetchData }) => {
  const [activeTab, setActiveTab] = useState<NotificationStatus>(
    NotificationStatus.ALL,
  );

  const filterNotificationsByStatus = (status: NotificationStatus) => {
    if (status === NotificationStatus.ALL) {
      return reqStocks;
    } else if (status === NotificationStatus.CONFIRM) {
      return reqStocks.filter((reqStock) => reqStock.status === 'CONFIRM');
    } else {
      return reqStocks.filter((reqStock) => reqStock.status === status);
    }
  };

  const notificationsToShow = filterNotificationsByStatus(activeTab);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {Object.values(NotificationStatus).map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`whitespace-nowrap px-4 py-1 rounded-lg text-xs font-medium border transition-colors duration-300 ${
              activeTab === status
                ? 'bg-teal-500 text-white border-transparent'
                : 'text-teal-600 bg-white border-teal-300 hover:bg-teal-50'
            }`}
          >
            {status.replace(/INPROGRESS/g, 'IN PROGRESS')}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {notificationsToShow.map((reqStock) => (
          <ReqStockCard
            key={reqStock.id}
            reqStock={reqStock}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default TabsNotificationManagement;
