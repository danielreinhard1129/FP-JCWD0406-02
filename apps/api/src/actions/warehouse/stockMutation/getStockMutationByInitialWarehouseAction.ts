import { getStockMutationByInitialWarehouse } from '@/repositories/warehouse/stockMutation/getStockMutationByInitialWarehouse';

export const getStockMutationByInitialWarehouseAction = async (id: number) => {
  try {
    const stockMutation = await getStockMutationByInitialWarehouse(id);

    return {
      message: 'success',
      data: stockMutation,
    };
  } catch (error) {
    throw error;
  }
};
