import { uploadProductPhotos } from '@/repositories/warehouse/product/uploadPhotosProduct';
import fs from 'fs';
import { join } from 'path';
import { getPhotoProductByProductId } from '@/repositories/warehouse/product/getPhotoProductByProductId';
import { IProductPhoto } from '@/types/warehouse.types';

export const uploadProductPhotosAction = async (
  productId: number,
  files: Express.Multer.File[],
) => {
  try {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    // Validate uploaded files
    // Validate uploaded files
    const invalidFiles = files.filter((file) => {
      const originalnameParts = file.originalname.split('.');
      const fileExtension = originalnameParts[originalnameParts.length - 1];
      const fileSize = file.size;

      return !(
        allowedExtensions.includes(fileExtension.toLowerCase()) &&
        fileSize <= maxSize
      );
    });

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.originalname);
      throw new Error(
        `Invalid file(s): ${invalidFileNames.join(
          ', ',
        )}. Allowed extensions are ${allowedExtensions.join(
          ', ',
        )} and maximum file size is 1MB.`,
      );
    }

    // Get the filenames of the old photos from the database
    const photoProduct: IProductPhoto[] =
      await getPhotoProductByProductId(productId);
    const oldPhotoProducts = photoProduct.map((photo) => photo.photo_product);
    console.log('Retrieved old photos:', photoProduct);

    // Construct paths for each old photo
    const defaultDir = '../../public/photo-product';
    const oldImagePaths = oldPhotoProducts.map((photoProduct) =>
      join(__dirname, defaultDir, photoProduct),
    );
    console.log('Constructed paths for old photos:', oldImagePaths);

    oldImagePaths.forEach((oldImagePath) => {
      console.log('Trying to delete old photo:', oldImagePath);
      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('Deleted old photo:', oldImagePath);
        } else {
          console.log('Old photo does not exist:', oldImagePath);
        }
      } catch (error) {
        console.error('Error deleting old photo:', error);
      }
    });

    // Upload the new photos
    await uploadProductPhotos(productId, files);

    return {
      message: 'Upload photo success',
    };
  } catch (error) {
    throw error;
  }
};
