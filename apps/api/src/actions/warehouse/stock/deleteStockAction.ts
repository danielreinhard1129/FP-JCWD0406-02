import { deleteStock } from '@/repositories/warehouse/stock/deleteStock';

export const deleteStockAction = async (id: number) => {
  try {
    const stock = await deleteStock(id);

    return {
      message: 'delete stock success',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
