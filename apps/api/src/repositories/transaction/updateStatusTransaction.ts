import prisma from '@/prisma';
import { ITransaction } from '@/types/transaction.types';

export const updateStatusTransaction = async (
  id: number,
  data: ITransaction,
) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: { TransactionStatus: data.TransactionStatus },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
