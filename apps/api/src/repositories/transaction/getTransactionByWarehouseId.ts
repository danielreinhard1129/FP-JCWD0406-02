import prisma from '@/prisma';

export const getTransactionByWarehouseId = async (warehouseId: number) => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        warehouseId: warehouseId,
        TransactionStatus: 'WAITING_PAYMENT_CONFIRMATION',
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
