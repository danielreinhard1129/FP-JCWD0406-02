import prisma from '@/prisma';

export const journalStockReportByWarehouse = async (
  warehouseId: number,
  start: string,
  end: string,
) => {
  try {
    const stockReport = await prisma.journalStock.findMany({
      where: {
        Stock: {
          warehouseId: warehouseId,
        },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
    return stockReport;
  } catch (error) {
    throw error;
  }
};
