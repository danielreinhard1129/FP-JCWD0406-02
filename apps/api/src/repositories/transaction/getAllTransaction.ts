import prisma from '@/prisma';

export const getAllTransaction = async () => {
  try {
    const transaction = await prisma.transaction.findMany({
      include: {
        transactionDetails: { include: { Product: true } },
        Warehouse: true,
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
