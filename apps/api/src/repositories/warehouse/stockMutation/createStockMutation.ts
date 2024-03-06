import prisma from '@/prisma';
import { IStockMutation, IStockMutationDetail } from '@/types/warehouse.types';
import { Status } from '@prisma/client';

export const createStockMutation = async (
  data: IStockMutation,
  dataDetail: IStockMutationDetail[],
) => {
  try {
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
