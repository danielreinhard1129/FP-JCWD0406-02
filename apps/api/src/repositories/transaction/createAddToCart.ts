import prisma from '@/prisma';
import { IAddToCart } from '@/types/transaction.types';

export const addToCart = async (data: IAddToCart) => {
  try {
    const { userId, productId, quantity } = data;
    const existingCartEntry = await prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (existingCartEntry) {
      return await prisma.cart.update({
        where: { id: existingCartEntry.id },
        data: { quantity: existingCartEntry.quantity + quantity },
      });
    } else {
      return await prisma.cart.create({
        data,
      });
    }
  } catch (error) {
    throw error;
  }
};
