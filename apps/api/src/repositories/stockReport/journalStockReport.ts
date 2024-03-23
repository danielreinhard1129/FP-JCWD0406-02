import prisma from '@/prisma';

export const journalStockReport = async (
  start: string,
  warehouseId: number,
  end: string,
) => {
  try {
    const report = await prisma.journalStock.findMany({
      where: {
        Stock: {
          warehouseId: warehouseId,
        },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Stock: {
          include: {
            product: true,
            warehouse: true,
          },
        },
      },
    });

    console.log('repository result', report);

    return report;
  } catch (error) {
    throw error;
  }
};
