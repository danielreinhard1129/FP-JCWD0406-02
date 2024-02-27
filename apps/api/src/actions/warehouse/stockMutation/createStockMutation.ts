import prisma from '@/prisma';
import { createStockMutation } from '@/repositories/warehouse/stockMutation/createStockMutation';
import { IStockMutation } from '@/types/warehouse.types';

export const createStockMutationAction = async (data: IStockMutation) => {
  try {
    const stock = await createStockMutation(data);

    if (stock.status == 'CANCELLED')
      throw new Error('This product has been cancelled');

    if (stock.status == 'CONFIRM') {
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
      message: 'Success req stock',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
