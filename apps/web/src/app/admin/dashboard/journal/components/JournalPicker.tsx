'use client';
import React, { useEffect, useState } from 'react';
import WarehouseAutoComplete from '../../stock-mutation/components/WarehouseAutocomplete';
import { Datepicker } from 'flowbite-react';
import JournalStockList from './Sample';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

const JournalPicker = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null,
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [journalReport, setJournalReport] = useState([]);

  console.log('start', startDate);
  console.log('end', endDate);
  console.log('warehouse', selectedWarehouse);

  useEffect(() => {
    const stockReport = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/journal-stock-report?warehouseName=${selectedWarehouse}&start=${startDate}&end=${endDate}`,
        );
        console.log(response.data);

        setJournalReport(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    stockReport();
  }, [selectedWarehouse, startDate, endDate]);

  return (
    <div className="space-y-4">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center">
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
          <div className="flex justify-end">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl"
              // onClick={loadJournal} // Here you will probably want to use startDate and endDate to load the journal
            >
              Execute Journal
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/* AREA JOURNAL */}
      <div>INI WILAYAH UNTUK JURNAL NYA</div>
      <JournalStockList />
    </div>
  );
};

export default JournalPicker;
