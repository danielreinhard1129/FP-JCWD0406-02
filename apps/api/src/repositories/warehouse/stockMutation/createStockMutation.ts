import prisma from '@/prisma';
import { IStockMutation } from '@/types/warehouse.types';
import { Status } from '@prisma/client';

export const createStockMutation = async (data: IStockMutation) => {
  try {
    // const stock = await prisma.stockMutation.create({
    //   data: {
    //     ...data,
    //     status: Status.PENDING,
    //   },
    // });
    // return stock;
  } catch (error) {
    throw error;
  }
};
