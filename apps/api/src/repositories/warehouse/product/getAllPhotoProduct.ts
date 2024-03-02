import prisma from '@/prisma';

export const getAllPhotoProduct = async () => {
  try {
    const photoProduct = await prisma.productPhoto.findMany();
    return photoProduct;
  } catch (error) {
    throw error;
  }
};
