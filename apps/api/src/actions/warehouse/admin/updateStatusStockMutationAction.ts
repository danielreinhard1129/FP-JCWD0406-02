import prisma from '@/prisma';
import { updateStatusStockMutation } from '@/repositories/warehouse/admin/updateStatusStockMutation';
import { IStockMutation } from '@/types/warehouse.types';

export const updateStatusStockMutationAction = async (
  id: number,
  data: IStockMutation,
) => {
  try {
    const updateStock = await updateStatusStockMutation(id, data);

    if (updateStock.status == 'CANCELLED')
      throw new Error('This product has been cancelled');

    if (updateStock.status === 'CONFIRM') {
      // if (updateStock.warehouseId && updateStock.quantity) {
      //   await prisma.stock.update({
      //     where: { id: updateStock.warehouseId },
      //     data: {
      //       quantity: { decrement: updateStock.quantity },
      //     },
      //   });
      // } else {
      //   throw new Error('Warehouse ID or quantity is missing.');
      // }
      // if (updateStock.reqWarehouseId && updateStock.quantity) {
      //   await prisma.stock.update({
      //     where: {
      //       warehouseId: updateStock.reqWarehouseId,
      //       productId: updateStock.productId,
      //     },
      //     data: {
      //       quantity: { increment: updateStock.quantity },
      //     },
      // });
      // } else {
      // throw new Error('Request warehouse ID or quantity is missing.');
      // }
    }

    return {
      message: `Stock mutation success `,
      data: updateStock,
    };
  } catch (error) {
    throw error;
  }
};
