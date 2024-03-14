'use client';
// Assuming you're in a file like pages/warehouses/[warehouseId].tsx
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminIdentityCard from './components/AdminIdentityCard';
import HeaderWarehouse from './components/HeaderWarehouse';
import WarehouseDetailCard from './components/WarehouseDetailCard';
import HeaderProductWarehouse from './components/HeaderProductWarehouse';
import { toast } from 'sonner';
import { IProduct } from '@/app/products/components/ProductCard';
import TabsComponent from './components/WarehouseProductManagement copy';
import { fetchAllProducts } from '@/app/utils/helper/fetchAllProduct';
import { IStock } from '@/types/warehouse.types';

export interface IWarehouse {
  id: number;
  name: string;
  contact: string;
  road: string;
  subdistrict: string;
  city: string;
  state: string;
  postcode: number;
  village: string;
}

const WarehouseDetail = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [allStock, setAllStock] = useState<IStock[]>([]);
  const [inStockProducts, setInStockProducts] = useState<IProduct[]>([]); // Assu
  const [noStockProducts, setNoStockProducts] = useState<IProduct[]>([]); // Assu
  const [isLoading, setIsLoading] = useState(true);
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseId, setWarehouseId] = useState<number>(0);
  const params = useParams();
  console.log('check page all', allStock);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts().then();
      console.log('ini all  product', allProducts);

      setAllProducts(products);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/branch/${params.warehouse}`,
      );

      console.log('responseeeeeeee', response);

      const warehouse = response.data.data;
      const stocks = warehouse.stocks;

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
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [params.warehouse]);

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderWarehouse />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 px-4">
          <WarehouseDetailCard warehouse={warehouse as unknown as IWarehouse} />
          <AdminIdentityCard />
        </div>
        {/* Tabs for product management */}
        <HeaderProductWarehouse />
        <TabsComponent
          warehouseData={warehouseId}
          allProducts={allProducts}
          inStockProducts={inStockProducts}
          noStockProducts={noStockProducts}
          allStock={allStock}
        />
      </div>
    </div>
  );
};

export default WarehouseDetail;
