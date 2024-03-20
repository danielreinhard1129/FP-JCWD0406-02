import React from 'react';

const CardSummary = (summary: any) => {
  console.log('check in card summary', summary);

  return (
    <div className="flex flex-col mt-2">
      <text>Product : {summary?.summary?.title}</text>
      <text>Stock Arrived : {summary?.summary?.stockArrived}</text>
      <text>Stock Out : {summary?.summary?.stockOut}</text>
      <text>currentStock : {summary?.summary?.currentStock}</text>
    </div>
  );
};

export default CardSummary;
