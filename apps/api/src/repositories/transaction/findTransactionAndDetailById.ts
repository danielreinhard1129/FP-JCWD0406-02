import prisma from '@/prisma';

export const findTransactionAndDetailsById = async (transactionId: number) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        transactionDetails: true,
      },
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};
