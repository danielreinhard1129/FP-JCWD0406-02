import { updateReqStockStatus } from '@/repositories/superAdmin/updateReqStockStatus';
import { IReqStock } from '@/types/warehouse.types';

export const updateReqStockStatusAction = async (
  id: number,
  data: IReqStock,
) => {
  try {
    const reqStock = await updateReqStockStatus(id, data);

    return {
      message: 'Req stock status success updated',
      data: reqStock,
    };
  } catch (error) {
    throw error;
  }
};
