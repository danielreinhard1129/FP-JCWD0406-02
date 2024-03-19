import prisma from '@/prisma';

export const journalStockReportFix = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    console.log('parse repo', warehouseId, startDate, endDate);

    const report = await prisma.stock.findMany({
      where: {
        warehouseId: warehouseId,
        journal: {
          some: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        product: true,
        journal: true,
      },
    });
    return report;
  } catch (error) {
    throw error;
  }
};
