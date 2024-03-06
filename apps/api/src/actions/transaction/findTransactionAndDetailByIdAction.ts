import { findTransactionAndDetailsById } from '@/repositories/transaction/findTransactionAndDetailById';

export const findTransactionAndDetailsByIdAction = async (
  transactionId: number,
) => {
  try {
    const transactionData = await findTransactionAndDetailsById(transactionId);

    return {
      message: `this is your data transaction with id ${transactionId}`,
      data: transactionData,
    };
  } catch (error) {
    throw error;
  }
};
