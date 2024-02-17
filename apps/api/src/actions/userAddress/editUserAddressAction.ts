import { editUserAddress } from '@/repositories/userAddress/editUserAddress';
import { IAddress } from '@/types/user.types';

export const editUserAddressAction = async (body: IAddress, id: number) => {
  try {
    const userAddress = await editUserAddress(body, id);

    return {
      message: 'edit address success',
      data: userAddress,
    };
  } catch (error) {
    throw error;
  }
};
