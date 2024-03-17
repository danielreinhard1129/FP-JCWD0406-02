'use client';
import React, { useState } from 'react';
import WarehouseAutoComplete from '../../stock-mutation/components/WarehouseAutocomplete';
import { Datepicker } from 'flowbite-react';
import JournalStockList from './Sample';

const JournalPicker = () => {
  const [warehouseId, setWarehouseId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  console.log('start', startDate);
  console.log('end', endDate);
  console.log('warehouse', warehouseId);

  return (
    <div className="space-y-4">
      {/* Area Picker */}
      <div className="flex justify-between gap-5 items-center">
        <WarehouseAutoComplete onWarehouseSelect={setWarehouseId} />
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
