import prisma from '@/prisma';
import { IReqStock } from '@/types/warehouse.types';

export const updateReqStockStatus = async (id: number, data: IReqStock) => {
  try {
    const reqStock = await prisma.reqStock.update({
      where: { id },
      data: {
        status: data.status,
      },
    });
    return reqStock;
  } catch (error) {
    throw error;
  }
};
