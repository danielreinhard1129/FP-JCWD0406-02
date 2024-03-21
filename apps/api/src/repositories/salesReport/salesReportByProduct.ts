import prisma from '@/prisma';

export const salesReportByProduct = async (
  productId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const report = await prisma.product.findMany({
      where: {
        transactionDetails: {
          some: {
            productId: productId,
            Transaction: {
              TransactionStatus: 'ORDER_CONFIRMED',
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      },
      include: {
        transactionDetails: {
          include: {
            Transaction: true,
          },
        },
      },
    });
    return report;
    // const report = await prisma.product.findMany({
    //   include: {
    //     transactionDetails: {
    //       where: {
    //         productId: productId,
    //         Transaction: {
    //           createdAt: {
    //             gte: startDate,
    //             lte: endDate,
    //           },
    //         },
    //       },
    //       include: {
    //         Transaction: true,
    //       },
    //     },
    //   },
    // });
    // return report;
  } catch (error) {
    throw error;
  }
};
