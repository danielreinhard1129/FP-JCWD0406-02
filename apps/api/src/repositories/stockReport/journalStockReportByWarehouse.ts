import prisma from '@/prisma';

export const journalStockReportByWarehouse = async (
  warehouseId: number,
  start: string,
  end: string,
) => {
  try {
    const stockReport = await prisma.product.findMany({
      include: {
        Stock: {
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
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            journal: true,
          },
        },
      },
    });
    return stockReport;
  } catch (error) {
    throw error;
  }
};
