import prisma from '@/prisma';

export const getStockMutationByInitialWarehouse = async (id: number) => {
  try {
    const stockMutation = await prisma.stockMutation.findMany({
      where: {
        initialWarehouseId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        stockMutationDetail: {
          include: {
            Product: true,
          },
        },
        destinationWarehouse: true,
      },
    });
    return stockMutation;
  } catch (error) {
    throw error;
  }
};
