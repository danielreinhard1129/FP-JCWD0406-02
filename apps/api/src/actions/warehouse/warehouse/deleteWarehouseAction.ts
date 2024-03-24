import { deleteWarehouse } from '@/repositories/warehouse/warehouse/deleteWarehouse';

export const deleteWarehouseAction = async (id: number) => {
  try {
    const warehouse = await deleteWarehouse(id);
    return {
      message: 'Success delete warehouse',
      data: warehouse,
    };
  } catch (error) {
    throw error;
  }
};
