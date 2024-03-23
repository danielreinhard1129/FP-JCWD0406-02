'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderAdminManagement from './components/HeaderAdminManagement';
import CardAllUser from '../user-management/components/CardAllUser';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const getUsersByRoleId = async () => {
    const roleId = 2;
    try {
      const response = await axios.get(`${baseUrl}/users/with-role`, {
        params: { roleId },
      });
      console.log('mana roleId', response);

      setUsers(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getUsersByRoleId();
  }, []);

  const refreshAdminPage = async () => {
    getUsersByRoleId();
  };

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderAdminManagement refreshAdminPage={refreshAdminPage} />
        <div className="flex-wrap">
          <CardAllUser userData={users} refreshAdminPage={refreshAdminPage} />
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(UserManagement);
