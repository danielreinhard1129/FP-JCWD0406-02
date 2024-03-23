import prisma from '@/prisma';

export const journalStockReportFix = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    console.log('parse repo', warehouseId, startDate, endDate);

    const report = await prisma.product.findMany({
      include: {
        Stock: {
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
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            journal: true,
          },
        },
      },
    });

    return report;
  } catch (error) {
    throw error;
  }
};
