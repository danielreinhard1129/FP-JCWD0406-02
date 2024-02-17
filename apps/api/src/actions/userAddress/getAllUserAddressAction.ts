import { getAllUserAddress } from '@/repositories/userAddress/getAllUserAddress';

export const getAllUserAddressAction = async () => {
  try {
    const userAddress = await getAllUserAddress();

    return {
      message: 'All users addresses successfully fetched',
      data: userAddress,
    };
  } catch (error) {
    throw error;
  }
};
