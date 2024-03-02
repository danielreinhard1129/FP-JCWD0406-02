import prisma from '@/prisma';

export const uploadProductPhotos = async (
  productId: number,
  files: Express.Multer.File[],
) => {
  try {
    const productPhotos = files.map((file: Express.Multer.File) => ({
      photo_product: `/${file.filename}`,
    }));

    await prisma.product.update({
      where: { id: productId },
      data: { productPhoto: { createMany: { data: productPhotos } } },
    });

    return productPhotos;
  } catch (error) {
    throw error;
  }
};
