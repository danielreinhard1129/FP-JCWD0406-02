import prisma from '@/prisma';
import { updateStatusStockMutation } from '@/repositories/warehouse/admin/updateStatusStockMutation';
import { getProductById } from '@/repositories/warehouse/product/getProductById';
import { findStockMutationDetails } from '@/repositories/warehouse/stockMutation/findStockMutationDetails';
import { getStockMutationById } from '@/repositories/warehouse/stockMutation/getStockMutationById';
import { IStockMutation } from '@/types/warehouse.types';

export const updateStatusStockMutationAction = async (
  id: number,
  data: IStockMutation,
) => {
  try {
    console.log('check id from update stock : ', id);

    console.log('check data stock mutation :', data);

    const updateStock = await getStockMutationById(id);
    console.log('check dataa', updateStock);

    if (data.status == 'CANCELLED') {
      const updateStock = await getStockMutationById(id);
      const data = await prisma.stockMutation.update({
        where: { id: updateStock?.id },
        data: {
          status: 'CANCELLED',
        },
      });
      return {
        message: 'stock mutation cancelled',
        data: data,
      };
    }

    if (updateStock?.status || data.status === 'CONFIRM') {
      console.log('check in line 23 :', updateStock);

      // Retrieve stock mutation details
      const stockMutationDetails = await prisma.stockMutationDetail.findMany({
        where: { stockMutationId: updateStock?.id },
      });
      console.log(
        'stockMutationDetailsssssssssssssss : ',
        stockMutationDetails,
      );

      for (const detail of stockMutationDetails) {
        const existingStock = await prisma.stock.findFirst({
          where: {
            AND: [
              { warehouseId: updateStock?.initialWarehouseId },
              { productId: detail.productId },
            ],
          },
        });

        if (!existingStock || existingStock.quantity < detail.quantity) {
          // If stock is insufficient, update stock mutation status to CANCELLED
          const dataa = await prisma.stockMutation.update({
            where: { id },
            data: {
              status: 'CANCELLED',
            },
          });
          const product = await getProductById(detail.productId);
          return {
            message: `Insufficient stock for product ${product?.title}`,
            data: dataa,
          };
        }
      }

      // Update stock based on stock mutation details
      for (const detail of stockMutationDetails) {
        await prisma.stock.updateMany({
          where: {
            productId: detail.productId,
            warehouseId: updateStock?.initialWarehouseId,
          },
          data: {
            quantity: {
              decrement: detail.quantity, // Decrement quantity  from the initial warehouse
            },
          },
        });
        console.log('detailsssss', detail);

        await prisma.stock.updateMany({
          where: {
            productId: detail.productId,
            warehouseId: updateStock?.destinationWarehouseId,
          },
          data: {
            quantity: {
              increment: detail.quantity, // Increment quantity in the destination warehouse
            },
          },
        });

        const destinationWarehouse = await prisma.stock.findFirst({
          where: {
            warehouseId: updateStock?.destinationWarehouseId,
            productId: detail.productId,
          },
        });

        const initialWarehouse = await prisma.stock.findFirst({
          where: {
            warehouseId: updateStock?.initialWarehouseId,
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
              quantity: detail.quantity,
              type: `Reduction from mutation`,
              totalQuantity: initialWarehouse?.quantity as number,
            },
          ],
        });
      }
    }
    console.log('bawahhh', updateStock);

    return {
      message: `Stock mutation success `,
      data: updateStock,
    };
  } catch (error) {
    throw error;
  }
};
