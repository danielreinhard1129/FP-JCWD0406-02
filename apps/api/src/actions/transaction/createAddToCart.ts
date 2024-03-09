import { addToCart } from '@/repositories/transaction/createAddToCart';
import { IAddToCart } from '@/types/transaction.types';

export const addToCartAction = async (data: IAddToCart) => {
  try {
    const cartItem = await addToCart(data);

    return {
      message: 'Product added to cart successfully',
      data: cartItem,
    };
  } catch (error) {
    throw error;
  }
};
