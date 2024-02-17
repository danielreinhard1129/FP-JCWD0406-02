import { getUserAddressById } from '@/repositories/userAddress/getUserAddressById';

export const getUserAddressByIdAction = async (id: number) => {
  try {
    const userAddress = await getUserAddressById(id);

    return {
      message: 'user address ',
      data: userAddress,
    };
  } catch (error) {
    throw error;
  }
};
