import prisma from '@/prisma';
import { IAddToCart } from '@/types/transaction.types';

export const updateQuantityCart = async (id: number, data: IAddToCart) => {
  try {
    const cart = await prisma.cart.update({
      where: { id },
      data: {
        quantity: data.quantity,
      },
    });
    return cart;
  } catch (error) {
    throw error;
  }
};
