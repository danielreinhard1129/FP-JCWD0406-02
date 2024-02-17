import { addUserAddress } from '@/repositories/userAddress/addUserAddress';
import { IAddress } from '@/types/user.types';

export const addUserAddressAction = async (data: IAddress) => {
  try {
    const userAddress = await addUserAddress(data);

    return {
      message: 'Add address success',
    };
  } catch (error) {
    throw error;
  }
};
