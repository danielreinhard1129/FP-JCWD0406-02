import { setDefaultAddress } from '@/repositories/userAddress/setDefaultAddress';

export const setDefaultAddressAction = async (
  userId: number,
  addressId: number,
) => {
  try {
    const updatedAddress = await setDefaultAddress(userId, addressId);
    return {
      message: 'Set as default address successfully',
      data: updatedAddress,
    };
  } catch (error) {
    throw error;
  }
};
