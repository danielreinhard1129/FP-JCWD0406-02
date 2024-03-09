import prisma from '@/prisma';
import { ITransaction, ITransactionDetails } from '@/types/transaction.types';
import { Status, TransactionStatus } from '@prisma/client';

export const createTransaction = async (
  data: ITransaction,
  dataDetails: ITransactionDetails[],
) => {
  try {
    console.log('data : ', data);
    console.log('data details : ', dataDetails);

    const transaction = await prisma.$transaction(async (prisma) => {
      const createTransaction = await prisma.transaction.create({
        data: {
          ...data,
          TransactionStatus: 'WAITING_FOR_PAYMENT',
        },
      });
      const transactionId = createTransaction.id;

      const dataDetailWithTransactionId = dataDetails.map((detail) => ({
        ...detail,
        transactionId,
      }));

      await prisma.transactionDetails.createMany({
        data: dataDetailWithTransactionId,
      });

      return createTransaction;
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};
