import prisma from '@/prisma';

export const getTransactionByWarehouseId = async (warehouseId: number) => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        warehouseId: warehouseId,
      },
      include: {
        transactionDetails: {
          include: {
            Product: true,
          },
        },
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
