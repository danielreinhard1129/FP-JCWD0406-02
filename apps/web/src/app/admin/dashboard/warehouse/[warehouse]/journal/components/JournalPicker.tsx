'use client';
import React, { useEffect, useState } from 'react';
import { Datepicker } from 'flowbite-react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import WarehouseAutoComplete from '@/app/admin/dashboard/stock-mutation/components/WarehouseAutocomplete';
import { useParams } from 'next/navigation';
import SummaryJournalWarehouseCard from './SummaryJournalWarehouse';
import ModalJournalWarehouse from './ModalJournalWarehouse';

interface Product {
  id: number;
  title: string;
}

interface Warehouse {
  name: string;
}

interface Stock {
  id: number;
  quantity: number;
  totalQuantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  warehouse: Warehouse;
}

interface JournalEntry {
  id: number;
  product: Product;
  journal: Stock[]; // Assuming journal is an array of Stock
}

export interface SummaryData {
  product: Product;
  stockArrived: number;
  stockOut: number;
  currentStock: number;
}
const JournalPicker = () => {
  const params = useParams();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [journalReport, setJournalReport] = useState<JournalEntry[]>([]);
  const [summaryJournal, setSummaryJournal] = useState<SummaryData[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Stock[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log('ini hasil journal di warehouse', journalReport);

  useEffect(() => {
    const stockReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/journal-stock-report/${params.warehouse}?start=${startDate}&end=${endDate}`,
        );
        console.log(response.data);
        setSummaryJournal(response.data.summary);
        setJournalReport(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    stockReport();
  }, [startDate, endDate, params.warehouse]);

  const handleShowJournal = (productId: number) => {
    // Find the data for the selected product
    const selectedData = journalReport.find(
      (entry: JournalEntry) => entry.product.id === productId,
    );
    setSelectedJournal(selectedData ? selectedData.journal : null);
    setIsModalOpen(true);
  };
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
        <SummaryJournalWarehouseCard
          summary={summaryJournal}
          onShowJournal={handleShowJournal}
        />

        {isModalOpen && selectedJournal && (
          <ModalJournalWarehouse
            journals={selectedJournal}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default JournalPicker;
