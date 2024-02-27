import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const editProduct = async (body: IProduct, id: number) => {
  try {
    const { title, description, price, weight } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        weight,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
