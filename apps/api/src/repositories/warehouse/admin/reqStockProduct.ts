import prisma from '@/prisma';
import { IReqStock } from '@/types/warehouse.types';
import { Status } from '@prisma/client';

export const reqStockProduct = async (data: IReqStock) => {
  try {
    const { warehouseId, productId, quantity } = data;
    const stock = await prisma.reqStock.create({
      data: {
        warehouseId,
        productId,
        quantity,
        status: Status.PENDING,
      },
    });
    return stock;
  } catch (error) {
    throw error;
  }
};
