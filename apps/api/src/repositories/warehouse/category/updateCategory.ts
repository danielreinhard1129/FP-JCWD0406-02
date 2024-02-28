import prisma from '@/prisma';
import { ICategory } from '@/types/warehouse.types';

export const updateCategory = async (productData: Partial<ICategory>) => {
  try {
    const { id, ...data } = productData;
    const updatedProduct = await prisma.category.update({
      where: { id },
      data: { isDeleted: false },
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};
