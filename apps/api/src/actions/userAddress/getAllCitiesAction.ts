import { getAllCities } from '@/repositories/userAddress/getAllCities';

export const getAllCitiesAction = async () => {
  try {
    const cities = await getAllCities();

    return {
      message: 'All cities',
      data: cities,
    };
  } catch (error) {
    throw error;
  }
};
