import React from 'react';
import ProfilePageComp from './components/ProfilePage';
import Sidebar from './components/SideBar';

const ProfilePage = () => {
  return (
    <div className="md:flex max-w-7xl mx-auto px-8 lg:px-0">
      <Sidebar />
      <ProfilePageComp />
    </div>
  );
};

export default ProfilePage;
