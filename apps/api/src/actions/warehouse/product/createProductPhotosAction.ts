import { createProductPhotos } from '@/repositories/warehouse/product/createPhotoProduct';

export const createProductPhotosAction = async (
  productId: number,
  files: Express.Multer.File[],
) => {
  try {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 1 * 1024 * 1024;

    const invalidFiles = files.filter((file) => {
      const originalnameParts = file.originalname.split('.');
      const fileExtension = originalnameParts[originalnameParts.length - 1];
      const fileSize = file.size;

      return !(
        allowedExtensions.includes(fileExtension.toLowerCase()) &&
        fileSize <= maxSize
      );
    });

    await createProductPhotos(productId, files);

    return true;
  } catch (error) {
    throw error;
  }
};
