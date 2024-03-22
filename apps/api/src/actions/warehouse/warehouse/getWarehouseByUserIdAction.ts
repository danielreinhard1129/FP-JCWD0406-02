import { getWarehouseByUserId } from '@/repositories/warehouse/warehouse/getWarehouseByUserId';

export const getWarehouseByUserIdAction = async (userId: number) => {
  try {
    const userWarehouse = await getWarehouseByUserId(userId);

    return {
      message: 'user warehouse',
      data: userWarehouse,
    };
  } catch (error) {
    throw error;
  }
};
