import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const updateProduct = async (productData: Partial<IProduct>) => {
  try {
    const { id, ...data } = productData;
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { isDeleted: false },
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};
