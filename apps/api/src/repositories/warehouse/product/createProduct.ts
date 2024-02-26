import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const createProduct = async (data: IProduct, id: number) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        userId: id,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
