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
import SelectOptionCategory from '../dashboard/category-management/components/SelectOptionCategory';
import WarehouseAutoComplete from '../dashboard/stock-mutation/components/WarehouseAutocomplete';

interface Transaction {
  createdAt: string;
  id: number;
  paymentImg: string | null;
  shippingCost: number;
  totalPrice: number;
  userId: number;
  warehouseId: number;
}

interface Warehouse {
  city: string;
  cityId: string;
  contact: string;
  createdAt: string;
  id: number;
  isDeleted: boolean;
  latitude: number;
  longitude: number;
  name: string;
  postcode: string;
  road: string;
  state: string;
  subdistrict: string;
  transaction: Transaction[];
}

interface ChartData {
  name: string;
  totalPrice: number;
  shippingCost: number;
}

const SalesPickerNew = () => {
  const [salesReport, setSalesReport] = useState<Warehouse[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(
    null,
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  console.log('sales', salesReport);

  useEffect(() => {
    const salesReportByWarehouse = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/transactions/sales-report?warehouseId=${selectedWarehouse}&start=${startDate}&end=${endDate}`,
        );
        setSalesReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    salesReportByWarehouse();
  }, [selectedWarehouse, startDate, endDate]);

  const processChartData = (data: Warehouse[]) => {
    const processedData = data.map((warehouse) => {
      const totals = warehouse.transaction.reduce(
        (acc, transaction) => {
          acc.totalPrice += transaction.totalPrice;
          acc.shippingCost += transaction.shippingCost;
          return acc;
        },
        { totalPrice: 0, shippingCost: 0 },
      );

      return {
        name: warehouse.name,
        totalPrice: totals.totalPrice,
        shippingCost: totals.shippingCost,
      };
    });

    setChartData(processedData);
  };

  useEffect(() => {
    if (salesReport.length > 0) {
      processChartData(salesReport);
    }
  }, [salesReport]);

  const salesReportAllWarehouse = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/transactions/sales-report?start=${startDate}&end=${endDate}`,
      );

      console.log(response.data);

      setSalesReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-2">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center mb-4">
        <div className="flex gap-5">
          <WarehouseAutoComplete onWarehouseSelect={setSelectedWarehouse} />
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

export default SalesPickerNew;
