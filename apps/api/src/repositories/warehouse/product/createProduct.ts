import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const createProduct = async (data: IProduct) => {
  try {
    const product = await prisma.product.create({ data });

    return product;
  } catch (error) {
    throw error;
  }
};
