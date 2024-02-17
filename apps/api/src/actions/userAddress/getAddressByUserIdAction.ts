import { getAddresByUserId } from '@/repositories/userAddress/getAddressByUserId';

export const getAddresByUserIdAction = async (userId: number) => {
  try {
    const userAddresses = await getAddresByUserId(userId);

    return {
      message: 'this is your addresses',
      data: userAddresses,
    };
  } catch (error) {
    throw error;
  }
};
