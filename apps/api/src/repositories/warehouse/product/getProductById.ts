import prisma from '@/prisma';

export const getProductById = async (productId: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
