import prisma from '@/prisma';

export const catalogProduct = async (category: string) => {
  try {
    const page = 1;
    const pageSize = 10;
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
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return catalog;
  } catch (error) {
    throw error;
  }
};
