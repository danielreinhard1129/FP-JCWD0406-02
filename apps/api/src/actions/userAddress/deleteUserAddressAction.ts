import { deleteUserAddress } from '@/repositories/userAddress/deleteUserAddress';

export const deleteUserAddressAction = async (id: number) => {
  try {
    const userAddress = await deleteUserAddress(id);

    return {
      message: 'delete address success',
      data: userAddress,
    };
  } catch (error) {
    throw error;
  }
};
