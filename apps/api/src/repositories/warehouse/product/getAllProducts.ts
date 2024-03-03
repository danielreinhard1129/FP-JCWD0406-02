import prisma from '@/prisma';

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productPhotos: true,
        Category: true,
      },
      where: { isDeleted: false },
    });

    return products;
  } catch (error) {
    throw error;
  }
};
