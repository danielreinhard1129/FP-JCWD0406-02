import { journalStockReport } from '@/repositories/stockReport/journalStockReport';

export const journalStockReportAction = async (
  warehouseName: string,
  start: string,
  end: string,
) => {
  try {
    console.log(warehouseName);

    const reportData = await journalStockReport(start, warehouseName, end);

    let totalAddition = 0;
    let totalReduction = 0;
    let endingStock = 0;

    reportData.forEach((entry) => {
      if (entry.type === 'addition') {
        totalAddition += entry.quantity;
      } else if (entry.type === 'reduction') {
        totalReduction += entry.quantity;
      }
    });

    endingStock =
      reportData.length > 0
        ? reportData[reportData.length - 1].totalQuantity
        : 0;

    return {
      message: 'stock report data',
      data: reportData,
      summary: {
        totalAddition,
        totalReduction,
        endingStock,
      },
    };
  } catch (error) {
    throw error;
  }
};
