import { getWarehouseById } from '@/repositories/warehouse/warehouse/getWarehouseById';

export const getWarehouseByIdAction = async (id: number) => {
  try {
    const warehouse = await getWarehouseById(id);

    return {
      message: 'Success get data warehouse by id',
      data: warehouse,
    };
  } catch (error) {
    throw error;
  }
};
