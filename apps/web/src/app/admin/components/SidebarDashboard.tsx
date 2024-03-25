'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import {
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiBell,
} from 'react-icons/fi';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { BiTransferAlt } from 'react-icons/bi';
import { LuWarehouse } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { baseUrll } from '@/app/utils/database';

export interface IUser {
  user: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  contact: number;
  roleId: number;
}
const AdminSidebar: React.FC = () => {
  const user = useSelector((state: IUser) => state.user);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const params = useParams();
  const toggleSubMenu = (menu: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  console.log(user);

  return (
    <div className="w-60 min-h-screen bg-white text-gray-800 flex flex-col shadow">
      {/* Admin Profile */}
      <div className="flex gap-2 items-center">
        <div className="my-2 ml-2 relative space-x-4 w-16 h-16 items-center">
          <Image
            src={
              user?.profile_picture
                ? `${baseUrll}/photo-profile/${user.profile_picture}`
                : '/default-avatar.png'
            }
            alt="Profile Picture"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <div>
            <p className="font-semibold text-sm text-gray-800">
              {user.username ? user.username : 'Username'}
            </p>
            <p className="text-xs text-gray-600">
              {user.role ? user.role : 'Admin'}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Sidebar Navigation */}
      <div className="flex-grow p-4 text-sm">
        <ul className="flex flex-col space-y-6 ">
          <Link
            href="/admin/dashboard"
            className="flex items-center cursor-pointer transform transition-all hover:scale-105 duration-300"
          >
            <FiHome className="mr-2 size-5" />
            <span className="font-semibold hover:text-teal-600">Home</span>
          </Link>
          {user.roleId === 1 ? (
            <div className="flex flex-col space-y-6 ">
              <Link
                href="/admin/dashboard/notification"
                className="flex items-center cursor-pointer transform transition-all hover:scale-105 duration-300"
              >
                <FiBell className="mr-2 size-5" />
                <span className="font-semibold hover:text-teal-600">
                  Notification
                </span>
              </Link>
              <Link
                href="/admin/dashboard/orders"
                className="flex items-center cursor-pointer transform transition-all hover:scale-105 duration-300"
              >
                <FiShoppingBag className="mr-2 size-5" />
                <span className="font-semibold hover:text-teal-600">
                  Orders
                </span>
              </Link>
              <Link
                href="/admin/dashboard/stock-mutation"
                className="flex items-center cursor-pointer transform transition-all hover:scale-105 duration-300"
              >
                <BiTransferAlt className="mr-2 size-5" />
                <span className="font-semibold hover:text-teal-600">
                  Stock Mutation
                </span>
              </Link>
              <Link
                href="/admin/dashboard/journal"
                className="flex items-center cursor-pointer transform transition-all hover:scale-105 duration-300"
              >
                <BsFillJournalBookmarkFill className="mr-2 size-5 font-bold" />
                <span className="font-semibold hover:text-teal-600">
                  Journal
                </span>
              </Link>
            </div>
          ) : null}
          {user.roleId === 1 ? (
            <li>
              <div
                className="flex items-center justify-between cursor-pointer transform transition-all hover:scale-105 duration-300"
                onClick={() => toggleSubMenu('userManagement')}
              >
                <span className="flex items-center">
                  <FiUsers className="mr-2 size-5" />
                  <span className="font-semibold hover:text-teal-600">
                    User & Admin
                  </span>
                </span>
                {collapsed['userManagement'] ? (
                  <FaChevronDown className="ml-2" />
                ) : (
                  <FaChevronRight className="ml-2" />
                )}
              </div>

              {collapsed['userManagement'] && (
                <ul className="ml-10 mt-1 space-y-1 flex flex-col ">
                  <Link
                    href="/admin/dashboard/user-management"
                    className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                  >
                    User Management
                  </Link>
                  <Link
                    href="/admin/dashboard/admin-management"
                    className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                  >
                    Admin Management
                  </Link>
                </ul>
              )}
            </li>
          ) : null}
          {user.roleId === 1 ? (
            <li>
              <div
                className="flex items-center justify-between cursor-pointer transform transition-all hover:scale-105 duration-300"
                onClick={() => toggleSubMenu('productManagement')}
              >
                <span className="flex items-center">
                  <FiPackage className="mr-2 size-5" />
                  <span className="font-semibold hover:text-teal-600">
                    Product
                  </span>
                </span>
                {collapsed['productManagement'] ? (
                  <FaChevronDown className="ml-2" />
                ) : (
                  <FaChevronRight className="ml-2" />
                )}
              </div>
              {collapsed['productManagement'] && (
                <div className="ml-10 mt-1 space-y-1 flex flex-col">
                  <Link
                    href="/admin/dashboard/create-product"
                    className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                  >
                    Create Product
                  </Link>
                  <Link
                    href="/admin/dashboard/product-management"
                    className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                  >
                    Product Management
                  </Link>

                  <Link
                    href="/admin/dashboard/category-management"
                    className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                  >
                    Category Management
                  </Link>
                </div>
              )}
            </li>
          ) : null}
          <li>
            <div
              className="flex items-center justify-between cursor-pointer transform transition-all hover:scale-105 duration-300"
              onClick={() => toggleSubMenu('warehouse')}
            >
              <span className="flex items-center">
                <LuWarehouse className="mr-2 size-5" />
                <span className="font-semibold cursor-pointer hover:text-teal-600">
                  Warehouse
                </span>
              </span>
              {collapsed['warehouse'] ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </div>
            {collapsed['warehouse'] && (
              <ul className="ml-10 mt-1 space-y-1 flex flex-col">
                <Link
                  href="/admin/dashboard/warehouse"
                  className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                >
                  Warehouse Management
                </Link>
                <Link
                  href="/admin/dashboard/warehouse"
                  className="cursor-pointer hover:text-teal-600 transform transition-all hover:scale-105 duration-300"
                >
                  Warehouse Branch
                </Link>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
