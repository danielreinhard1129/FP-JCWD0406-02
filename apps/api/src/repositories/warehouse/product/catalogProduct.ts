import prisma from '@/prisma';

export const catalogProduct = async (category: string) => {
  try {
    const catalog = await prisma.product.findMany({
      where: {
        Category: {
          category_name: {
            contains: category,
          },
        },
      },
      include: {
        Category: true,
        productPhotos: true,
        Stock: true,
      },
    });

    return catalog;
  } catch (error) {
    throw error;
  }
};
