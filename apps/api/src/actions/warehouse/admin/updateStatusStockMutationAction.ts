import { updateStatusStockMutation } from '@/repositories/warehouse/admin/updateStatusStockMutation';
import { Status } from '@prisma/client';

export const updateStatusStockMutationAction = async (
  id: number,
  status: Status,
) => {
  try {
    const updateStock = await updateStatusStockMutation(id, status);

    return {
      message: `Stock mutation ${status}`,
      data: updateStock,
    };
  } catch (error) {
    throw error;
  }
};
