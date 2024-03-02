import { createProduct } from '@/repositories/warehouse/product/createProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { updateProduct } from '@/repositories/warehouse/product/updateProduck';
import { IProduct } from '@/types/warehouse.types';

export const createProductAction = async (
  data: string,
  files: Express.Multer.File[],
) => {
  try {
    console.log('actionnnnnn atsss', data);

    const dataParse: IProduct = JSON.parse(data);
    console.log('atassssss', dataParse);

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    // Validate uploaded files
    for (const file of files) {
      const originalnameParts = file.originalname.split('.');
      const fileExtension = originalnameParts[originalnameParts.length - 1];

      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        throw new Error('Invalid file extension');
      }

      if (file.size > maxSize) {
        throw new Error('File size exceeds the limit');
      }
    }

    const checkTitle = await getProductByTitle(dataParse.title);
    if (checkTitle) {
      if (checkTitle.isDeleted) {
        await updateProduct({ ...checkTitle, isDeleted: false });
        return {
          message: 'Product with the same title was restored',
        };
      } else {
        throw new Error(
          `Product with this ${dataParse.title} title already exists`,
        );
      }
    } else {
      console.log('checkkkks', dataParse);

      const product = await createProduct(dataParse);

      if (!product) {
        throw new Error('Failed to create product');
      }

      const productId = product.id;

      // if (files.length > 0) {
      //   const uploadedPhotos = await createProductPhotos(productId, files);
      //   if (!uploadedPhotos) {
      //     throw new Error('Failed to upload product photos');
      //   }
      // }

      return {
        message: 'Create Product Success!',
        data: product,
      };
    }
  } catch (error) {
    throw error;
  }
};
