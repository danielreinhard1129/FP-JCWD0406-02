'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { baseUrl } from '@/app/utils/database';
import { fetchAllProducts } from '@/app/utils/helper/fetchAllProduct';
import { loginAction, logoutAction } from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FiLogOut,
  FiPackage,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import SearchBar2 from './SearchBar2';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export interface ProductPhoto {
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  productPhoto: ProductPhoto[];
  categoryId: number;
  Category: ICategory;
}

export interface ICategory {
  id: number;
  category_name: string;
}
export const Navbar = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispacth = useAppDispatch();
  const { userGoogle, logOut } = UserAuth();

  const handleLogout = async () => {
    await logOut();
    localStorage.removeItem('token_auth');
    dispacth(logoutAction());
    router.push('/');
  };

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts();

      setAllProducts(products);
      setIsLoading(false); // Set loading to false after the fetch completes
    };
    getProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token_auth');
    const keepLogin = async () => {
      try {
        const { data } = await axios.get(baseUrl + '/users/keeplogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const keep = data.data;
        keep.roleId = data.data.roleId;

        dispacth(loginAction(keep));
      } catch (error) {
        console.log(error);
      }
    };
    keepLogin();
  }, [user]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-white sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3"
        aria-label="Global"
      >
        <div className="flex pl-1 lg:px-3">
          <Link href="/" className="lg:block">
            <Image
              width="100"
              height="100"
              className="h-8 w-auto hidden lg:block"
              src="/LOGOBRDL.png"
              alt=""
            />
          </Link>
          <Link href="/" className="pl-2 font-bold text-3xl hidden lg:block">
            BORDL
          </Link>
        </div>
        <div className="mx-4 hidden lg:flex lg:gap-x-12">
          <Link
            href="/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            All Product
          </Link>
        </div>
        <div className="flex w-full max-w-3xl">
          {!isLoading && <SearchBar2 allProducts={allProducts} />}
        </div>

        <div className="ml-4 flex lg:gap-x-12 items-center">
          <a
            href="/cart"
            className="text-sm font-semibold leading-6 text-gray-900 mr-4"
          >
            <FiShoppingCart className="h-6 w-6" />
          </a>
        </div>
        <div className="hidden lg:block lg:gap-x-12 items-center">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 mr-4"
          >
            <FiPackage className="inline h-6 w-6 align-middle -mt-1" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {user.id || userGoogle ? (
          <div className="relative hidden lg:block">
            {/* Profile Icon Button */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 bg-teal-300 rounded-full hover:bg-teal-200"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open profile menu</span>
              <FiUser />
              {/* <img
                className="w-8 h-8 rounded-full"
                src="/path/to/your/profile/image.jpg"
                alt="User menu"
              /> */}
            </button>

            <div
              className={`${
                dropdownOpen ? 'block' : 'hidden'
              } absolute right-0 z-50 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {user.roleId === 1 || user.roleId === 2 ? (
                <Link
                  href="/admin/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div role="menuitem">
                    <LuLayoutDashboard className="font-extrabold inline-block w-5 h-5 mr-3" />
                    Dashboard
                  </div>
                </Link>
              ) : null}
              <a
                href="/user"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FiSettings className="inline-block w-5 h-5 mr-3" />
                Settings
              </a>

              <a
                onClick={handleLogout}
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FiLogOut className="inline-block w-5 h-5 mr-3" />
                Log Out
              </a>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">BORDL</span>
              <Image
                width="100"
                height="100"
                className="h-8 w-auto"
                src="/LOGOBRDL.png"
                alt="Logo BORDIL"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-4 py-6">
                <div className="flex items-center space-x-3">
                  <Image
                    width="100"
                    height="100"
                    className="h-10 w-10 rounded-full"
                    src="/LOGOBRDL.png"
                    alt="User Profile"
                  />
                  <div>
                    <div className="text-base font-medium leading-7 text-gray-900">
                      {user.username}
                    </div>
                    <div className="text-sm font-normal leading-7 text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 py-6">
                <a
                  href="/user"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  My Profile
                </a>
                <a
                  href="/user/address"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  My Address
                </a>
                <a
                  href="/transaction"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Transaction
                </a>
                {user.roleId === 1 || user.roleId === 2 ? (
                  <a
                    href="admin/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </a>
                ) : null}
              </div>

              <div className="py-6">
                {user.id || userGoogle ? (
                  <Link
                    onClick={handleLogout}
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
