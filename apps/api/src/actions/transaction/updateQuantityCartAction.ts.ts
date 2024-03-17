import prisma from '@/prisma';
import { updateQuantityCart } from '@/repositories/transaction/updateQuantityCart';
import { IAddToCart } from '@/types/transaction.types';

export const updateQuantityCartAction = async (
  id: number,
  data: IAddToCart,
) => {
  try {
    if (data.quantity == 0) {
      await prisma.cart.delete({
        where: { id },
      });

      return {
        message: 'cart  has been removed',
      };
    }

    const cart = await updateQuantityCart(id, data);
    return {
      message: 'success update quanitty product in cart',
      data: cart,
    };
  } catch (error) {
    throw error;
  }
};
