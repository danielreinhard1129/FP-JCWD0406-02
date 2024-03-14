import { stockReport } from '@/repositories/warehouse/stock/stockReport';

export const stockReportAction = async () => {
  try {
    const stock = await stockReport();

    return {
      message: 'stock report ',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
