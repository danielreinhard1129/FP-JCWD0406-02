import prisma from '@/prisma';
import { IStock } from '@/types/warehouse.types';

export const createStock = async (data: IStock) => {
  try {
    const stock = await prisma.stock.create({ data });
    return stock;
  } catch (error) {
    throw error;
  }
};
