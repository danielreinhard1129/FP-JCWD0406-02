'use client';

import { UserAuth } from '@/app/utils/context/authContext';
import { baseUrl, baseUrll } from '@/app/utils/database';
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

import { HiInformationCircle } from 'react-icons/hi';
import { LuLayoutDashboard } from 'react-icons/lu';
import SearchBar2 from './SearchBar2';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setCartItems } from '@/lib/features/cartSlice';
import { Alert } from 'flowbite-react';

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
  const [warehouseId, setWarehouseId] = useState('');
  const user = useAppSelector((state) => state.user);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const userId = user.id;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userGoogle, logOut } = UserAuth();
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const [showVerificationAlert, setShowVerificationAlert] =
    useState<boolean>(false);
  const isVerified = useAppSelector(
    (state: RootState) => state.user.isVerified,
  );

  useEffect(() => {
    const userLoggedIn: boolean = userId !== 0;

    if (!userLoggedIn) {
      setShowLoginAlert(true);
      const timeoutId = setTimeout(() => setShowLoginAlert(false), 5000);
      return () => clearTimeout(timeoutId);
    } else {
      setShowLoginAlert(false);

      if (!isVerified) {
        const manageVerificationAlert = () => {
          setShowVerificationAlert(true);
          const timeoutId = setTimeout(
            () => setShowVerificationAlert(false),
            5000,
          );
          return () => clearTimeout(timeoutId);
        };

        manageVerificationAlert();
        const intervalId = setInterval(manageVerificationAlert, 120000);

        return () => clearInterval(intervalId);
      }
    }
  }, [userId, isVerified]);

  const handleLogout = async () => {
    await logOut();
    localStorage.removeItem('token_auth');
    dispatch(logoutAction());
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

        dispatch(loginAction(keep));
        const warehouseId = keep.warehouse[0].id;
        setWarehouseId(warehouseId);
      } catch (error) {
        console.log(error);
      }
    };
    keepLogin();
  }, [dispatch, user]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transactions/cart/${userId}`,
        );

        dispatch(setCartItems(response.data.data));
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId, dispatch]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      {showLoginAlert && (
        <div className="fixed top-10 md:left-6 z-50">
          <Alert
            color="warning"
            icon={HiInformationCircle}
            onDismiss={() => setShowLoginAlert(false)}
          >
            <span className="font-medium">Login required!</span> Please log in
            to continue.
          </Alert>
        </div>
      )}
      {showVerificationAlert && (
        <div className="max-w-7xl mx-auto fixed top-16 md:left-6 z-50">
          <Alert
            color="warning"
            icon={HiInformationCircle}
            onDismiss={() => setShowVerificationAlert(false)}
          >
            <span className="font-medium text-xs">Verification needed! </span>
            <span className="text-xs">
              Go to Profile to verify your account!
            </span>
          </Alert>
        </div>
      )}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3"
        aria-label="Global"
      >
        <div className="flex pl-1 lg:px-3 transform transition-all hover:scale-105 duration-300">
          <Link href="/" className="lg:block">
            <Image
              width="100"
              height="100"
              className="h-8 w-auto hidden lg:block"
              src="/LOGOBRDL.png"
              alt=""
            />
          </Link>
          <Link
            href="/"
            className="pl-2 font-bold text-3xl hidden lg:block  transform transition-all hover:scale-105 duration-300"
          >
            BORDL
          </Link>
        </div>
        <div className="mx-4 hidden lg:flex lg:gap-x-12">
          <Link
            href="/products"
            className="text-sm font-semibold leading-6 text-gray-900  transform transition-all hover:scale-105 duration-300"
          >
            Catalog
          </Link>
        </div>
        <div className="flex w-full max-w-3xl ">
          {!isLoading && <SearchBar2 allProducts={allProducts} />}
        </div>

        <Link
          href="/cart"
          className="relative text-sm font-semibold leading-6 text-gray-900 pl-6 pr-2 transform transition-all hover:scale-105 duration-300"
        >
          <FiShoppingCart className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs">
              {cart.length}
            </span>
          )}
        </Link>

        <Link
          href="/"
          className="hidden lg:block px-6 lg:gap-x-12 items-center transform transition-all hover:scale-105 duration-300"
        >
          <div className="text-sm font-semibold leading-6 text-gray-900 ">
            <FiPackage className="inline h-6 w-6 align-middle -mt-1" />
          </div>
        </Link>
        {/* BUTTON DROPDOWNNYA */}
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
              <div>
                <Image
                  src={
                    user?.profile_picture
                      ? `${baseUrll}/photo-profile/${user.profile_picture}`
                      : '/default-avatar.png'
                  }
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="object-cover rounded-full w-10 h-10 transform transition-all hover:scale-105 duration-300"
                />
              </div>
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
              {user.roleId === 1 ? (
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
              {user.roleId === 2 && warehouseId ? (
                <Link
                  href={`/admin/dashboard/warehouse/${warehouseId}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div role="menuitem">
                    <LuLayoutDashboard className="font-extrabold inline-block w-5 h-5 mr-3" />
                    Dashboard
                  </div>
                </Link>
              ) : null}
              <Link
                href="/user"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FiSettings className="inline-block w-5 h-5 mr-3" />
                Profile
              </Link>

              <Link
                onClick={handleLogout}
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FiLogOut className="inline-block w-5 h-5 mr-3" />
                Log Out
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end  transform transition-all hover:scale-105 duration-300">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 "
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
      {/* menu drop tadinya disini    */}
    </header>
  );
};
