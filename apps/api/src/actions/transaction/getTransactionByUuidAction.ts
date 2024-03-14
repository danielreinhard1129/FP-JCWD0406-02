import { getTransactionByUuid } from '@/repositories/transaction/getTransactionByUuid';

export const getTransactionByUuidAction = async (uuid: string) => {
  try {
    const transaction = await getTransactionByUuid(uuid);

    return {
      message: 'this is your transaction detail',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
