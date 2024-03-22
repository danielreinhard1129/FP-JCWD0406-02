// 'use client';
// import { baseUrl } from '@/app/utils/database';
// import axios from 'axios';
// import { Datepicker } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import SelectOptionCategory from '../dashboard/category-management/components/SelectOptionCategory';
// import WarehouseAutoComplete from '../dashboard/stock-mutation/components/WarehouseAutocomplete';

// const SalesPicker = () => {
//   const [salesReport, setSalesReport] = useState<any[]>([]);
//   const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(
//     null,
//   );
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState('');
//   // const [chartData, setChartData] = useState

//   // const handleProductChange = (index: number, productId: number) => {};

//   const salesReportAllWarehouse = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}/transactions/sales-report?start=${startDate}&end=${endDate}`,
//       );

//       console.log(response.data);

//       setSalesReport(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const salesReportByWarehouse = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}/transactions/sales-report?warehouseId=${selectedWarehouse}&start=${startDate}&end=${endDate}`,
//       );
//       setSalesReport(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const salesReportByProduct = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `${baseUrl}/transactions/sales-report?productId=1&start=${startDate}&end=${endDate}`,
//   //     );
//   //     setSalesReport(response.data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   const salesReportByCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${baseUrl}/transactions/sales-report?categoryId=${selectedCategoryId}&start=${startDate}&end=${endDate}`,
//       );
//       console.log('response category', response.data.data);

//       setSalesReport(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     salesReportAllWarehouse();
//     salesReportByWarehouse();
//     // salesReportByProduct();
//     salesReportByCategory();
//   }, [selectedWarehouse, selectedCategoryId, startDate, endDate]);

//   console.log(salesReport);

//   return (
//     <div className="space-y-2">
//       {/* Area Picker */}
//       <div className="flex justify-between gap-5 items-center mb-4">
//         <div className="flex gap-5">
//           <WarehouseAutoComplete onWarehouseSelect={setSelectedWarehouse} />
//           <Datepicker
//             title="Start Date"
//             onSelectedDateChanged={(date) => setStartDate(date)}
//           />

//           <Datepicker
//             title="End Date"
//             onSelectedDateChanged={(date) => setEndDate(date)}
//           />
//           <SelectOptionCategory
//             onCategoryChange={setSelectedCategoryId}
//             className="rounded-lg form-input mt-1 block w-full"
//           />
//           {/* <ProductSelect
//             onChange={(productId) => handleProductChange(index, productId)}
//           /> */}
//         </div>
//       </div>
//       <div>
//         <ResponsiveContainer height={250} width="100%">
//           <BarChart
//             // data={salesReport.map((data) => ({
//             //   name: data.Warehouse.name,
//             //   Price: data.totalPrice,
//             //   Shipping: data.shippingCost,
//             // }))}
//             margin={{ right: 25, top: 10 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Legend />
//             <Bar dataKey="totalPrice" fill="#00897B" name="Total Price" />
//             <Bar dataKey="shippingCost" fill="#FFECB3" name="Shipping Cost" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SalesPicker;
