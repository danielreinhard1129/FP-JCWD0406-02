import prisma from '@/prisma';

export const getRandomProducts = async () => {
  try {
    const allProducts = await prisma.product.findMany({
      where: { isDeleted: false },
      include: {
        productPhotos: true,
        Category: true,
      },
    });

    for (let i = allProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
    }

    return allProducts;
  } catch (error) {
    throw error;
  }
};
