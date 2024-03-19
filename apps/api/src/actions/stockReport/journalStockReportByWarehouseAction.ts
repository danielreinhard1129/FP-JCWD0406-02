import { journalStockReportByWarehouse } from '@/repositories/stockReport/journalStockReportByWarehouse';

export const journalStockReportByWarehouseAction = async (
  warehouseId: number,
  start: string,
  end: string,
) => {
  try {
    const reportData = await journalStockReportByWarehouse(
      warehouseId,
      start,
      end,
    );

    let totalAddition = 0;
    let totalReduction = 0;
    let endingStock = 0;

    reportData.forEach((entry) => {
      if (
        entry.type === 'addition' ||
        entry.type === 'addition from mutation' ||
        entry.type === 'added new stock'
      ) {
        totalAddition += entry.quantity;
      } else if (
        entry.type === 'reduction' ||
        entry.type === 'Reduction from mutation' ||
        entry.type === 'shipped to user'
      ) {
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
