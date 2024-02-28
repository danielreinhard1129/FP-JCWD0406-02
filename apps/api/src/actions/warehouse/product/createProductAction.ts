import { getUserById } from '@/repositories/user/getUserById';
import { createProduct } from '@/repositories/warehouse/product/createProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { updateProduct } from '@/repositories/warehouse/product/updateProduck';
import { IProduct } from '@/types/warehouse.types';

export const createProductAction = async (data: IProduct) => {
  try {
    const checkTitle = await getProductByTitle(data.title);
    if (checkTitle) {
      if (checkTitle.isDeleted) {
        await updateProduct({ ...checkTitle, isDeleted: false });
        return {
          message: 'Product with the same title was restored',
        };
      } else {
        throw new Error(`Product with this ${data.title} title already exists`);
      }
    } else {
      const product = await createProduct(data);

      return {
        message: 'Create Product Success!',
        data: product,
      };
    }
  } catch (error) {
    throw error;
  }
};
