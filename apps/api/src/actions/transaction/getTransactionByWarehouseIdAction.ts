import { getTransactionByWarehouseId } from '@/repositories/transaction/getTransactionByWarehouseId';

export const getTransactionByWarehouseIdAction = async (
  warehouseId: number,
) => {
  try {
    const transaction = await getTransactionByWarehouseId(warehouseId);

    return {
      message: 'this data transactions is waiting for confirmation',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
