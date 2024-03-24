'use client';
import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import { Datepicker } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import ProductSelect from '../../../components/ProductSelect';

interface Transaction {
  createdAt: string;
  id: number;
  paymentImg: string | null;
  shippingCost: number;
  totalPrice: number;
  userId: number;
  warehouseId: number;
}

interface TransactionDetail {
  transactionId: number;
  quantity: number;
  Transaction: Transaction;
}

interface Product {
  id: number;
  title: string;
  transactionDetails: TransactionDetail[];
}

interface ProductChartData {
  name: string;
  totalPrice: number;
  shippingCost: number;
}

const SalesPickerProductWarehouse = () => {
  const [salesReport, setSalesReport] = useState<Product[]>([]);
  const [chartData, setChartData] = useState<ProductChartData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const salesReportByProduct = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transactions/sales-report?productId=1&start=${startDate}&end=${endDate}`,
        );

        console.log('product', response.data.data);

        setSalesReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    salesReportByProduct();
  }, [selectedProduct, startDate, endDate]);

  const processChartData = (products: Product[]) => {
    const processedData: ProductChartData[] = products.map((product) => {
      let totalPrice = 0;
      let shippingCost = 0;

      product.transactionDetails.forEach((detail) => {
        totalPrice += detail.Transaction.totalPrice * detail.quantity;
        shippingCost += detail.Transaction.shippingCost * detail.quantity;
      });

      return {
        name: product.title,
        totalPrice: totalPrice,
        shippingCost: shippingCost,
      };
    });

    setChartData(processedData);
  };

  useEffect(() => {
    if (salesReport.length > 0) {
      processChartData(salesReport);
    }
  }, [salesReport]);

  return (
    <div className="space-y-2">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center mb-4">
        <div className="flex gap-5">
          <ProductSelect onChange={setSelectedProduct} />
          <Datepicker
            title="Start Date"
            onSelectedDateChanged={(date) => setStartDate(date)}
          />

          <Datepicker
            title="End Date"
            onSelectedDateChanged={(date) => setEndDate(date)}
          />
        </div>
      </div>
      <ResponsiveContainer className="text-xs" height={250} width="60%">
        <BarChart
          width={500}
          height={500}
          data={chartData}
          margin={{
            top: 5,
            right: 100,
            left: 100,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar
            dataKey="totalPrice"
            fill="#00897B"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="shippingCost"
            fill="#FFECB3"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPickerProductWarehouse;
