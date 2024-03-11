import { getUserCart } from '@/repositories/transaction/getUserCart';

export const getUserCartAction = async (userId: number) => {
  try {
    const cartItems = await getUserCart(userId);
    return {
      message: 'Cart items retrieved successfully',
      data: cartItems,
    };
  } catch (error) {
    throw error;
  }
};
