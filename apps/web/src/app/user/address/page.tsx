import React from 'react';
import Sidebar from '../components/SideBar';
import Address from './components/Address';

const UserAddress = () => {
  return (
    <div className="md:flex max-w-7xl mx-auto px-8 lg:px-0">
      <Sidebar />
      <Address />
    </div>
  );
};

export default UserAddress;
