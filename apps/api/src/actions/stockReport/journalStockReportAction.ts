import { journalStockReport } from '@/repositories/stockReport/journalStockReport';

export const journalStockReportAction = async (
  warehouseIds: number[],
  start: string,
  end: string,
) => {
  try {
    const reportData = await journalStockReport(warehouseIds, start, end);

    return {
      message: 'stock report data',
      data: reportData,
    };
  } catch (error) {
    throw error;
  }
};
