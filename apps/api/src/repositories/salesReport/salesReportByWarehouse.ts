import prisma from '@/prisma';

export const salesReportByWarehouse = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const report = await prisma.warehouse.findMany({
      where: {
        transaction: {
          some: {
            warehouseId: warehouseId,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        transaction: true,
      },
    });
    return report;
    // const report = await prisma.warehouse.findMany({
    //   where: {
    //     transaction: {
    //       some: {
    //         TransactionStatus: 'ORDER_CONFIRMED',
    //         warehouseId: warehouseId,
    //         createdAt: {
    //           gte: startDate,
    //           lte: endDate,
    //         },
    //       },
    //     },
    //   },
    // });
    // return report;
  } catch (error) {
    throw error;
  }
};
