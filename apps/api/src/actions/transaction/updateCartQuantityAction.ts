import prisma from '@/prisma';
import { updateCartQuantity } from '@/repositories/transaction/updateCartQuantity';
import { IAddToCart } from '@/types/transaction.types';

export const updateCartQuantityAction = async (
  id: number,
  data: IAddToCart,
) => {
  try {
    if (data.quantity == 0) {
      await prisma.cart.delete({
        where: { id },
      });
    }
    const cart = await updateCartQuantity(id, data);

    return {
      message: 'Successfully updated the quantity',
      data: cart,
    };
  } catch (error) {
    throw error;
  }
};
