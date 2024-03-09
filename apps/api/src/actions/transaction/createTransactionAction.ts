import { createTransaction } from '@/repositories/transaction/createTransaction';
import { findTransactionDetails } from '@/repositories/transaction/findTransactionDetails';
import { ITransaction, ITransactionDetails } from '@/types/transaction.types';

export const createTransactionAction = async (
  data: ITransaction,
  dataDetails: ITransactionDetails[],
) => {
  try {
    const transaction = await createTransaction(data, dataDetails);

    const transactionDetails = await findTransactionDetails(data);

    return {
      message: 'your transaction  has been created successfully',
      data: transaction,
      transactionDetails,
    };
  } catch (error) {
    throw error;
  }
};
