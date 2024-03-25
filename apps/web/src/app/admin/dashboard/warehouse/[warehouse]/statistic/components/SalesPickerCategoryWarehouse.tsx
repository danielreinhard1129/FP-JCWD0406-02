'use client';
import SelectOptionCategory from '@/app/admin/dashboard/category-management/components/SelectOptionCategory';
import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import { Datepicker } from 'flowbite-react';
import { useParams } from 'next/navigation';
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
  quantity: number;
  Transaction: Transaction;
}

interface Product {
  id: number;
  title: string;
  transactionDetails: TransactionDetail[];
}

interface Category {
  id: number;
  category_name: string;
  product: Product[];
}

interface CategoryChartData {
  name: string;
  totalPrice: number;
  shippingCost: number;
}

const SalesPickerCategoryWarehouse = () => {
  const params = useParams();
  const [salesReport, setSalesReport] = useState<any>([]);
  const [chartData, setChartData] = useState<CategoryChartData[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('4');
  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date();
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );
    return oneMonthAgo;
  });
  const [endDate, setEndDate] = useState<Date>(() => new Date());
  const warehouseId = params.warehouse;

  useEffect(() => {
    const salesReportByCategory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transactions/sales-report-warehouse?categoryId=${selectedCategoryId}&warehouseId=${warehouseId}&start=${startDate}&end=${endDate}`,
        );
        console.log('response category', response.data.data);

        setSalesReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    salesReportByCategory();
  }, [selectedCategoryId, warehouseId, startDate, endDate]);

  const processChartData = (categories: Category[]) => {
    const processedData = categories.map((category) => {
      let totalPrice = 0;
      let shippingCost = 0;

      category.product.forEach((product) => {
        product.transactionDetails.forEach((detail) => {
          totalPrice += detail.Transaction.totalPrice * detail.quantity;
          shippingCost += detail.Transaction.shippingCost * detail.quantity;
        });
      });

      return {
        name: category.category_name,
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
          <SelectOptionCategory
            onCategoryChange={setSelectedCategoryId}
            className="rounded-lg form-input block"
          />
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

export default SalesPickerCategoryWarehouse;
