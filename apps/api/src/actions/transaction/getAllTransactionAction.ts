import prisma from '@/prisma';
import { getAllTransaction } from '@/repositories/transaction/getAllTransaction';

export const getAllTransactionAction = async () => {
  try {
    const transaction = await getAllTransaction();

    return {
      message: 'this is all data transaction',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
