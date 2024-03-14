import { getWaitingForConfirmationTransaction } from '@/repositories/transaction/getWaitingForConfirmationTransaction';

export const getWaitingForConfirmationTransactionAction = async () => {
  try {
    const transaction = await getWaitingForConfirmationTransaction();

    return {
      message: 'this all transaction is waiting for confirmation',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
