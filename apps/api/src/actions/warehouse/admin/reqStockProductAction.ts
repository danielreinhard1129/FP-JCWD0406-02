import { reqStockProduct } from '@/repositories/warehouse/admin/reqStockProduct';
import { IReqStock } from '@/types/warehouse.types';

export const reqStockProductAction = async (data: IReqStock) => {
  try {
    const stock = await reqStockProduct(data);

    return {
      message: 'Req Stock Product Success',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
