'use client';
// Assuming you're in a file like pages/warehouses/[warehouseId].tsx
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import { IProduct } from '@/app/products/components/ProductCard';
import { baseUrl } from '@/app/utils/database';
import { fetchAllProducts } from '@/app/utils/helper/fetchAllProduct';
import { RootState } from '@/lib/store';
import { IStock } from '@/types/warehouse.types';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import AdminIdentityCard from './components/AdminIdentityCard';
import HeaderProductWarehouse from './components/HeaderProductWarehouse';
import HeaderWarehouse from './components/HeaderWarehouse';
import WarehouseDetailCard from './components/WarehouseDetailCard';
import TabsComponent from './components/WarehouseProductManagement copy';

interface IRole {
  id: number;
  role_name: string;
}

interface IUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  profile_picture?: string;
  contact?: string;
  Role?: IRole;
}

interface IWarehouse {
  id: number;
  name: string;
  contact: string;
  road: string;
  subdistrict: string;
  city: string;
  state: string;
  postcode: number;
  village: string;
  userId: number;
}

const WarehouseDetail = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [allStock, setAllStock] = useState<IStock[]>([]);
  const [inStockProducts, setInStockProducts] = useState<IProduct[]>([]); // Assu
  const [noStockProducts, setNoStockProducts] = useState<IProduct[]>([]); // Assu
  const [warehouse, setWarehouse] = useState<IWarehouse[]>([]);
  const [admin, setAdmin] = useState<IUser | null>(null);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const params = useParams();
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts().then();

      setAllProducts(products);
    };
    getProducts();
  }, []);

  const getWarehouseDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/branch/${params.warehouse}`,
      );

      const warehouse = response.data.data;
      const stocks = warehouse.stocks;
      const admin = warehouse.user;
      const userId = warehouse.userId;
      console.log('checkkk warehousee', warehouse);

      setAdmin(admin);
      setWarehouseId(response.data.data.id);
      setWarehouse(response.data.data);
      setAllStock(stocks);
      setInStockProducts(
        stocks.filter(
          (stock: { product: IProduct; quantity: number }) =>
            stock.product && stock.quantity > 0,
        ),
      );
      setNoStockProducts(
        stocks.filter(
          (stock: { product: IProduct; quantity: number }) =>
            stock.product && stock.quantity < 1,
        ),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  }, [params.warehouse]);

  useEffect(() => {
    if (params.warehouse) {
      getWarehouseDetails();
    }
  }, [params.warehouse, getWarehouseDetails]);

  useEffect(() => {
    if (warehouse.length > 0 && warehouse[0]?.userId !== currentUser.id) {
      toast.error('Access denied: You are not an admin of this warehouse.');
      router.push('/');
    }
  }, [warehouse, currentUser, router]);

  const refreshWarehouse = async () => {
    getWarehouseDetails();
  };

  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        {/* <NonAsignAdminSelect /> */}
        <HeaderWarehouse />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 px-4">
          <WarehouseDetailCard warehouse={warehouse as unknown as IWarehouse} />
          <AdminIdentityCard
            admin={admin}
            warehouseData={warehouseId}
            refreshWarehouse={refreshWarehouse}
          />
        </div>
        {/* Tabs for product management */}
        <HeaderProductWarehouse />
        <TabsComponent
          warehouseData={warehouseId}
          allProducts={allProducts}
          inStockProducts={inStockProducts}
          noStockProducts={noStockProducts}
          allStock={allStock}
          refreshWarehouses={refreshWarehouse}
          getWarehouseDetails={getWarehouseDetails}
        />
      </div>
    </div>
  );
};

export default WarehouseDetail;
