import prisma from '@/prisma';

export const journalStockReportByWarehouse = async (
  warehouseId: number,
  start: string,
  end: string,
) => {
  try {
    const stockReport = await prisma.stock.findMany({
      where: {
        warehouseId: warehouseId,
        journal: {
          some: {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
        },
      },
      include: {
        product: true,
        journal: true,
      },
    });
    return stockReport;
  } catch (error) {
    throw error;
  }
};
