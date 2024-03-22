import prisma from '@/prisma';

export const salesReportByCategory = async (
  categoryId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    console.log('checkkk', categoryId);

    const report = await prisma.category.findMany({
      where: {
        id: categoryId,
        product: {
          some: {
            transactionDetails: {
              some: {
                Transaction: {
                  createdAt: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        product: {
          include: {
            transactionDetails: {
              include: {
                Transaction: true,
              },
            },
          },
        },
      },
    });
    return report;
  } catch (error) {
    throw error;
  }
};
