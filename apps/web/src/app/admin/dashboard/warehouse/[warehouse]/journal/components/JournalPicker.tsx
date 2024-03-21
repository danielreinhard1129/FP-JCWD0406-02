'use client';
import React, { useEffect, useState } from 'react';
import { Datepicker } from 'flowbite-react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { useParams } from 'next/navigation';
import SummaryCard from './SummaryCard';

interface ProductSummary {
  productId: number;
  title: string;
  currentStock: number;
  stockArrived: number;
  stockOut: number;
  journal: JournalDetail[];
  Product: ProductDetail;
}

interface JournalDetail {
  id: number;
  quantity: number;
  type: string;
  totalQuantity: number;
  createdAt: string;
}
export interface ProductDetail {
  id: number;
  title: string;
}

const JournalPicker = () => {
  const params = useParams();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [journalReport, setJournalReport] = useState<ProductSummary[]>([]);

  console.log('ini jurnal', journalReport);

  useEffect(() => {
    const stockReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/journal-stock-report/${params.warehouse}?start=${startDate}&end=${endDate}`,
        );

        setJournalReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    stockReport();
  }, [startDate, endDate, params.warehouse]);

  return (
    <div className="space-y-2 z-0">
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
        <div className="sticky top-16 sabg-white px-6 border-b border-gray-200 ">
          <h2 className="text-base font-bold text-gray-800">
            Journal Stock Detail
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalReport.map((productSummary, index) => (
              <SummaryCard key={index} journalStock={productSummary} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPicker;
