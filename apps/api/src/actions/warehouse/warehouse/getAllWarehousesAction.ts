import { getAllWarehouses } from '@/repositories/warehouse/warehouse/getAllWarehouses';

export const getAllWarehousesAction = async () => {
  try {
    const warehouses = await getAllWarehouses();

    return {
      message: 'All data warehouses success',
      data: warehouses,
    };
  } catch (error) {
    throw error;
  }
};
