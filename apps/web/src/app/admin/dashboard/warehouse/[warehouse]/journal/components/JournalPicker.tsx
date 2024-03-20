'use client';
import React, { useEffect, useState } from 'react';
import { Datepicker } from 'flowbite-react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import WarehouseAutoComplete from '@/app/admin/dashboard/stock-mutation/components/WarehouseAutocomplete';
import { useParams } from 'next/navigation';
import { JournalStockCard } from '@/app/admin/dashboard/journal/components/JournalStockCard';
import CardJournalStock from './CardJournalStock';

interface Product {
  id: number;
  title: string;
}

interface Warehouse {
  name: string;
}

interface Stock {
  quantity: number;
  totalQuantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  warehouse: Warehouse;
}

interface JournalStockCardProps {
  journalStock: Stock[];
}

const JournalPicker = () => {
  const params = useParams();
  console.log('check paramssss', params);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [journalReport, setJournalReport] = useState([]);

  console.log('ini hasil journal', journalReport);

  useEffect(() => {
    const stockReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/journal-stock-report/${params.warehouse}?start=${startDate}&end=${endDate}`,
        );
        console.log(response.data);
        setJournalReport(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    stockReport();
  }, [startDate, endDate]);

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
      <hr />
      {/* AREA JOURNAL */}
      <div className="space-y-0.5">
        <div className="sticky top-16 bg-white px-6 border-b border-gray-200 ">
          <h2 className="text-base font-bold text-gray-800">
            Journal Stock Detail
          </h2>
        </div>
        <CardJournalStock journal={journalReport} />
        {/* {journalReport.map((report, index) => (
          <card key={index} journalStock={report} />
        ))} */}
      </div>
    </div>
  );
};

export default JournalPicker;
