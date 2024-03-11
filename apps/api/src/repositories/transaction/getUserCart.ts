// repositories/transaction/getUserCart.ts
import prisma from '@/prisma';

export const getUserCart = async (userId: number) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        Product: true,
        User: { include: { userAddress: true } },
      },
    });
    return cartItems;
  } catch (error) {
    throw error;
  }
};
