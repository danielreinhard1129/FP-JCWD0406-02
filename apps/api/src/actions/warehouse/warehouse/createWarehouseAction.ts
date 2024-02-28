import { createWarehouse } from '@/repositories/warehouse/warehouse/createWarehouse';
import { getLongLat } from '@/repositories/warehouse/warehouse/getLongLat';
import { IWarehouse } from '@/types/warehouse.types';

export const createWarehouseAction = async (data: IWarehouse) => {
  try {
    const { city, postcode, subdistrict, village, state } = data;

    const getLongitudeLatitude = await getLongLat(
      city,
      postcode,
      subdistrict,
      village,
      state,
    );

    const latitude = getLongitudeLatitude.results[0].geometry.lat;
    const longitude = getLongitudeLatitude.results[0].geometry.lng;

    data.latitude = latitude;
    data.longitude = longitude;

    const warehouse = await createWarehouse(data);

    return {
      message: 'success create warehouse',
      data: warehouse,
    };
  } catch (error) {
    throw error;
  }
};
