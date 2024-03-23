import { getReqStockByWarehouseId } from '@/repositories/warehouse/admin/getReqStockByWarehouseId';

export const getReqStockByWarehouseIdAction = async (warehouseId: number) => {
  try {
    const reqStock = await getReqStockByWarehouseId(warehouseId);

    return {
      message: 'this your data warehouse req stock',
      data: reqStock,
    };
  } catch (error) {
    throw error;
  }
};
