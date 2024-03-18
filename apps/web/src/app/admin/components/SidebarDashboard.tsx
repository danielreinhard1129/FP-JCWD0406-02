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

  const toggleSubMenu = (menu: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="w-60 min-h-screen bg-white text-gray-800 flex flex-col shadow">
      {/* Admin Profile */}
      <div className="p-4 flex space-x-4 items-center">
        <Image
          src={
            user?.profile_picture
              ? `${baseUrll}/photo-profile/${user.profile_picture}`
              : '/default-avatar.png'
          }
          alt="Profile Picture"
          width={100}
          height={100}
          className="object-cover rounded-full w-16 h-16"
        />
        <div>
          <p className="font-semibold text-gray-800">{user.username}</p>
          <p className="text-sm text-gray-600">{user.role}</p>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Sidebar Navigation */}
      <div className="flex-grow p-4 text-sm">
        <ul className="flex flex-col space-y-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center cursor-pointer"
          >
            <FiHome className="mr-2 size-5" />
            <span className="font-semibold hover:text-teal-600">Home</span>
          </Link>
          <Link
            href="/admin/dashboard/notification"
            className="flex items-center cursor-pointer"
          >
            <FiBell className="mr-2 size-5" />
            <span className="font-semibold hover:text-teal-600">
              Notification
            </span>
          </Link>
          <Link
            href="/admin/dashboard/orders"
            className="flex items-center cursor-pointer"
          >
            <FiShoppingBag className="mr-2 size-5" />
            <span className="font-semibold hover:text-teal-600">Orders</span>
          </Link>
          <Link
            href="/admin/dashboard/stock-mutation"
            className="flex items-center cursor-pointer"
          >
            <BiTransferAlt className="mr-2 size-5" />
            <span className="font-semibold hover:text-teal-600">
              Stock Mutation
            </span>
          </Link>
          <Link
            href="/admin/dashboard/journal"
            className="flex items-center cursor-pointer"
          >
            <BsFillJournalBookmarkFill className="mr-2 size-5 font-bold" />
            <span className="font-semibold hover:text-teal-600">Journal</span>
          </Link>

          {user.roleId === 1 ? (
            <li>
              <div
                className="flex items-center justify-between cursor-pointer"
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
                <ul className="ml-10 mt-1 space-y-1 flex flex-col">
                  <Link
                    href="/admin/dashboard/user-management"
                    className="cursor-pointer hover:text-teal-600"
                  >
                    User Management
                  </Link>
                  <Link
                    href="/admin/dashboard/admin-management"
                    className="cursor-pointer hover:text-teal-600"
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
                className="flex items-center justify-between cursor-pointer"
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
                    className="cursor-pointer hover:text-teal-600"
                  >
                    Create Product
                  </Link>
                  <Link
                    href="/admin/dashboard/product-management"
                    className="cursor-pointer hover:text-teal-600"
                  >
                    Product Management
                  </Link>

                  <Link
                    href="/admin/dashboard/category-management"
                    className="cursor-pointer hover:text-teal-600"
                  >
                    Category Management
                  </Link>
                </div>
              )}
            </li>
          ) : null}
          <li>
            <div
              className="flex items-center justify-between cursor-pointer"
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
                  className="cursor-pointer hover:text-teal-600"
                >
                  Warehouse Management
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
