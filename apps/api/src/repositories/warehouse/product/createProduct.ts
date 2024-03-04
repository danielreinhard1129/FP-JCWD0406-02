import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const createProduct = async (data: IProduct) => {
  try {
    const { title, description, price, weight, categoryId } = data;

    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        weight,
        categoryId,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
