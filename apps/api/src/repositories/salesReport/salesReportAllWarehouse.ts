import prisma from '@/prisma';

export const salesReport = async (startDate: string, endDate: string) => {
  try {
    const report = await prisma.warehouse.findMany({
      where: {
        transaction: {
          some: {
            TransactionStatus: 'ORDER_CONFIRMED',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        transaction: {
          include: {
            transactionDetails: true,
          },
        },
      },
    });
    return report;
    // const salesReport = await prisma.warehouse.findMany({
    //   include: {
    //     transaction: {
    //       where: {
    //         warehouseId: warehouseId,
    //         createdAt: {
    //           gte: startDate,
    //           lte: endDate,
    //         },
    //       },
    //       include: {
    //         transactionDetails: true,
    //       },
    //     },
    //   },
    // });
    // return salesReport;
  } catch (error) {
    throw error;
  }
};
