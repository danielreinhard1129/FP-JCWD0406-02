import prisma from '@/prisma';

export const getProductByTitle = async (title: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { title },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
