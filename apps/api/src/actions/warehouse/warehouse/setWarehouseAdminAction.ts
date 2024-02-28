// Import the repository function
import { setWarehouseAdmin } from '@/repositories/warehouse/warehouse/setWarehouseAdmin';
import { IWarehouse } from '@/types/warehouse.types';

// Define the action function
export const setWarehouseAdminAction = async (id: number, data: IWarehouse) => {
  try {
    const warehouse = await setWarehouseAdmin(id, data);

    return {
      message: `Successfully updated userId for Warehouse ${id}`,
      data: warehouse,
    };
  } catch (error) {
    throw error;
  }
};
