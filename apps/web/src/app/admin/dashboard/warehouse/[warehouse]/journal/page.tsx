'use client';
import React, { useState } from 'react';

import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import HeaderWarehouseJournal from './components/HeaderWarehouseStatistic';
import JournalPicker from './components/JournalPicker';

const WarehouseJournal = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10 ">
        <HeaderWarehouseJournal />
        <div className="flex-wrap">
          <JournalPicker />
        </div>
      </div>
    </div>
  );
};

export default WarehouseJournal;
