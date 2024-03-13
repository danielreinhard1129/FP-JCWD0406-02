import prisma from '@/prisma';

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productPhotos: true,
        Category: true,
        Stock: true,
      },
      where: { isDeleted: false },
    });

    const productsWithTotalQuantity = products.map((product) => {
      const totalQuantity = product.Stock.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
      return { ...product, totalQuantity };
    });

    return productsWithTotalQuantity;
  } catch (error) {
    throw error;
  }
};
