import prisma from '@/prisma';

export const getPhotoProductByProductId = async (productId: number) => {
  try {
    const photoProduct = await prisma.productPhoto.findMany({
      where: { productId },
    });
    return photoProduct;
  } catch (error) {
    throw error;
  }
};
