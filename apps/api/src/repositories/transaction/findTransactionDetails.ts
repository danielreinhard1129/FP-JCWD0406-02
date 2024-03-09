import prisma from '@/prisma';
import { ITransaction } from '@/types/transaction.types';

export const findTransactionDetails = async (data: ITransaction) => {
  try {
    const transactionDetails = await prisma.transactionDetails.findMany({
      where: { transactionId: data.id },
    });
    return transactionDetails;
  } catch (error) {
    throw error;
  }
};
