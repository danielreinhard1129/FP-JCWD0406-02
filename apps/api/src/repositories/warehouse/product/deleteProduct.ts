import prisma from '@/prisma';

export const deleteProduct = async (id: number) => {
  try {
    const deleteProduct = await prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });

    return deleteProduct;
  } catch (error) {
    throw error;
  }
};
