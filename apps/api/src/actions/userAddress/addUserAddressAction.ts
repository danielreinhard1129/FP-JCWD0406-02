import { addUserAddress } from '@/repositories/userAddress/addUserAddress';
import { getLongLat } from '@/repositories/warehouse/warehouse/getLongLat';
import { IAddress } from '@/types/user.types';

export const addUserAddressAction = async (data: IAddress) => {
  try {
    const { city, postal_code, province, district, street } = data;

    const getLongitudeLatitude = await getLongLat(
      city,
      postal_code,
      province,
      district,
      street,
    );

    const latitide = getLongitudeLatitude.results[0].geometry.lat;
    const longitude = getLongitudeLatitude.results[0].geometry.lng;

    data.latitude = latitide;
    data.longitude = longitude;
    const userAddress = await addUserAddress(data);

    return {
      message: 'Add address success',
      data: userAddress,
    };
  } catch (error) {
    throw error;
  }
};
