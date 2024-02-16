'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiPackage, FiSearch, FiShoppingCart } from 'react-icons/fi';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex px-3">
          <Link href="/" className="-m-1.5 p-1.5 lg:block">
            <span className="sr-only z">BORDL LOGO</span>
            <Image
              width="100"
              height="100"
              className="h-8 w-auto"
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
        <div className="flex w-auto max-w-3xl">
          <input
            type="search"
            placeholder="Search product..."
            className="text-sm rounded-l-md pl-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
          />
          <button
            type="submit"
            className="px-3 rounded-r-md bg-gray-200 text-gray-600 hover:bg-gray-300 flex items-center justify-center"
          >
            <FiSearch className="h-5 w-5" />
          </button>
        </div>
        <div className="ml-4 flex lg:gap-x-12 items-center">
          <a
            href="#"
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
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
                      Jordy Fucking Repi
                    </div>
                    <div className="text-sm font-normal leading-7 text-gray-500">
                      email@example.com
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  My Address
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Transaction
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </a>
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
