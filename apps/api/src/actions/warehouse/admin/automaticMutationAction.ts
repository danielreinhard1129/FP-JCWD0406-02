import { getAllWarehouses } from '@/repositories/warehouse/warehouse/getAllWarehouses';
import { getLongLat } from '@/repositories/warehouse/warehouse/getLongLat';

export const automaticMutationAction = async () => {
  try {
    // const warehouses = await getAllWarehouses();
    // const cities = warehouses.map((warehouse) => warehouse.city);
    // const query = cities.length > 0 ? `${cities[0]}` : '';
    // const response = await getLongLat(query);
    // const latitude = response.results[0].geometry.lat;
    // const longitude = response.results[0].geometry.lng;
    // const city = response.results[0].components.city;
    // return {
    //   message: 'success',
    //   data: {
    //     latitude,
    //     longitude,
    //     city,
    //   },
    // };
  } catch (error) {
    throw error;
  }
};
