import prisma from '@/prisma';
import { updateStatusStockMutation } from '@/repositories/warehouse/admin/updateStatusStockMutation';
import { findStockMutationDetails } from '@/repositories/warehouse/stockMutation/findStockMutationDetails';
import { IStockMutation } from '@/types/warehouse.types';

export const updateStatusStockMutationAction = async (
  id: number,
  data: IStockMutation,
) => {
  try {
    const updateStock = await updateStatusStockMutation(id, data);

    if (updateStock.status === 'CANCELLED') {
      throw new Error('This product has been cancelled');
    }

    if (updateStock.status === 'CONFIRM') {
      // Retrieve stock mutation details
      const stockMutationDetails = await findStockMutationDetails(data);

      // Update stock based on stock mutation details
      for (const detail of stockMutationDetails) {
        await prisma.stock.updateMany({
          where: {
            productId: detail.productId,
            warehouseId: updateStock.initialWarehouseId,
          },
          data: {
            quantity: {
              decrement: detail.quantity, // Decrement quantity from the initial warehouse
            },
          },
        });

        await prisma.stock.updateMany({
          where: {
            productId: detail.productId,
            warehouseId: updateStock.destinationWarehouseId,
          },
          data: {
            quantity: {
              increment: detail.quantity, // Increment quantity in the destination warehouse
            },
          },
        });

        const destinationWarehouse = await prisma.stock.findFirst({
          where: {
            warehouseId: updateStock.destinationWarehouseId,
            productId: detail.productId,
          },
        });

        const initialWarehouse = await prisma.stock.findFirst({
          where: {
            warehouseId: updateStock.initialWarehouseId,
            productId: detail.productId,
          },
        });
        console.log('id sotkc mutation', id);

        await prisma.stockMutation.update({
          where: { id },
          data: {
            status: 'SUCCESS',
          },
        });

        await prisma.journalStock.createMany({
          data: [
            {
              stockId: destinationWarehouse?.id as number,
              quantity: detail.quantity,
              type: 'addition from mutation',
              totalQuantity: destinationWarehouse?.quantity as number,
            },
            {
              stockId: initialWarehouse?.id as number,
              quantity: -detail.quantity,
              type: `Reduction from mutation`,
              totalQuantity: initialWarehouse?.quantity as number,
            },
          ],
        });
      }
    }

    return {
      message: `Stock mutation success `,
      data: updateStock,
    };
  } catch (error) {
    throw error;
  }
};
