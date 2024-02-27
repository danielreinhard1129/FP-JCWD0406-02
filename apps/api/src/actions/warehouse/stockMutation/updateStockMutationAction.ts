import prisma from '@/prisma';
import { getStockMutationById } from '@/repositories/warehouse/stockMutation/getStockMutationById';
import { IStockMutation } from '@/types/warehouse.types';

export const updateStockMutationAction = async (
  data: IStockMutation,
  id: number,
) => {
  try {
    const stock = await getStockMutationById(id);

    if (stock?.status == 'CANCELLED')
      throw new Error('This product has been cancelled');

    if (stock?.status == 'CONFIRM') {
      await prisma.stock.update({
        where: { id: data.warehouseId },
        data: {
          quantity: { decrement: data.quantity },
        },
      });

      await prisma.stock.update({
        where: { id: data.reqWarehouseId },
        data: {
          quantity: { increment: data.quantity },
        },
      });
    }

    return {
      message: `The Mutation stock was updated check data  stock`,
    };
  } catch (error) {
    throw error;
  }
};
