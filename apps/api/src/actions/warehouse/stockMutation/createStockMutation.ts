import prisma from '@/prisma';
import { getProductById } from '@/repositories/warehouse/product/getProductById';
import { getWarehouseById } from '@/repositories/warehouse/warehouse/getWarehouseById';
import { IStockMutation, IStockMutationDetail } from '@/types/warehouse.types';
import { Status } from '@prisma/client';

export const createStockMutationAction = async (
  data: IStockMutation,
  dataDetail: IStockMutationDetail[],
) => {
  try {
    // Check if initial warehouse has enough stock for each product
    for (const detail of dataDetail) {
      const existingStock = await prisma.stock.findFirst({
        where: {
          AND: [
            { warehouseId: data.initialWarehouseId },
            { productId: detail.productId },
          ],
        },
      });
      console.log('check existing stock : ', existingStock);
      console.log('check data detail', detail);
      const product = await getProductById(detail.productId);
      const warehouse = await getWarehouseById(data.initialWarehouseId);

      if (!existingStock || existingStock.quantity < detail.quantity) {
        throw new Error(
          `Insufficient stock for product ${product?.title} at ${warehouse?.name}`,
        );
      }
    }

    // Proceed to create stock mutation
    const stock = await prisma.$transaction(async (prisma) => {
      const createdStock = await prisma.stockMutation.create({
        data: {
          ...data,
          status: Status.PENDING,
        },
      });

      const stockMutationId = createdStock.id;

      const dataDetailsWithMutationId = dataDetail.map((detail) => ({
        ...detail,
        stockMutationId,
      }));

      await prisma.stockMutationDetail.createMany({
        data: dataDetailsWithMutationId,
      });

      return createdStock;
    });

    return stock;
  } catch (error) {
    throw error;
  }
};
