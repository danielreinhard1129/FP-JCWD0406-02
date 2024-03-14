import prisma from '@/prisma';

export const getWaitingForConfirmationTransaction = async () => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        TransactionStatus: 'WAITING_PAYMENT_CONFIRMATION',
      },
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
