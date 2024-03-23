import prisma from '@/prisma';

export const salesReportCategoryByWarehouseId = async (
  categoryId: number,
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const salesReportCategory = await prisma.category.findMany({
      where: {
        id: categoryId,
        product: {
          some: {
            transactionDetails: {
              some: {
                Transaction: {
                  warehouseId: warehouseId,
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
  } catch (error) {
    throw error;
  }
};
