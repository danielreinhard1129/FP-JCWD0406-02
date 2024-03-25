'use client';
import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import { param } from 'cypress/types/jquery';
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
import { log } from 'util';

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

const SalesPickerByWarehouse = () => {
  const params = useParams();

  console.log(params);

  const [salesReport, setSalesReport] = useState<Warehouse[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(
    null,
  );
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

  useEffect(() => {
    const warehouseId = Number(params.warehouse);
    setSelectedWarehouse(warehouseId);
  }, [params.warehouse]);

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
    if (salesReport?.length > 0) {
      processChartData(salesReport);
    }
  }, [salesReport]);

  return (
    <div className="space-y-2">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center mb-4">
        <div className="flex gap-5">
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

export default SalesPickerByWarehouse;
