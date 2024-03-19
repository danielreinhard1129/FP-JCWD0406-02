'use client';
import React, { useEffect, useState } from 'react';
import WarehouseAutoComplete from '../../stock-mutation/components/WarehouseAutocomplete';
import { Datepicker } from 'flowbite-react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { JournalStockCard } from './JournalStockCard';

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
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null,
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [journalReport, setJournalReport] = useState([]);

  console.log('ini hasil journal', journalReport);

  useEffect(() => {
    const stockReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/journal-stock-report?warehouseName=${selectedWarehouse}&start=${startDate}&end=${endDate}`,
        );
        // console.log(response.data.data);
        setJournalReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    stockReport();
  }, [selectedWarehouse, startDate, endDate]);

  return (
    <div className="space-y-2">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center mb-4">
        <WarehouseAutoComplete onWarehouseSelect={setSelectedWarehouse} />
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
        {journalReport.map((report, index) => (
          <JournalStockCard key={index} journalStock={report} />
        ))}
      </div>
    </div>
  );
};

export default JournalPicker;
