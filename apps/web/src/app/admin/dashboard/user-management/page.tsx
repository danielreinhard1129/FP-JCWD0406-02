'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Ensure this matches your directory structure
import AdminSidebar from '../../components/SidebarDashboard';
import CardAllUser from './components/CardAllUser';
import HeaderUserManagement from './components/HeaderUserManagement';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const getUsersByRoleId = async () => {
    const roleId = 3;
    try {
      const response = await axios.get(`${baseUrl}/users/with-role`, {
        params: { roleId },
      });
      // console.log('mana isverified', response);
      // console.log('roleId', roleId);

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
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
        <HeaderUserManagement />
        <div className="flex-wrap">
          <CardAllUser userData={users} refreshAdminPage={refreshAdminPage} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
