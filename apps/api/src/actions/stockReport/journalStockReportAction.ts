import { journalStockReport } from '@/repositories/stockReport/journalStockReport';

export const journalStockReportAction = async (
  warehouseId: number,
  start: string,
  end: string,
) => {
  try {
    const reportData = await journalStockReport(start, warehouseId, end);

    let totalAddition = 0;
    let totalReduction = 0;
    let endingStock = 0;

    reportData.forEach((entry) => {
      if (
        entry.type === 'addition' ||
        'addition from mutation' ||
        'added new stock'
      ) {
        totalAddition += entry.quantity;
      } else if (entry.type === 'reduction' || 'Reduction from mutation') {
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
