import { journalStockReport } from '@/repositories/stockReport/journalStockReport';

export const journalStockReportAction = async (
  warehouse: { name: string },
  start: string,
  end: string,
) => {
  try {
    const reportData = await journalStockReport(warehouse, start, end);

    return {
      message: 'stock report data',
      data: reportData,
    };
  } catch (error) {
    throw error;
  }
};
