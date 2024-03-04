// repositories/product/getProductById.ts
import prisma from '@/prisma';

export const getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id, isDeleted: false },
      include: {
        productPhoto: true,
        Category: true,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
