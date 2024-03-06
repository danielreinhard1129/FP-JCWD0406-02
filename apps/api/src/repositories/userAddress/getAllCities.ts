import prisma from '@/prisma';

export const getAllCities = async () => {
  try {
    const cities = await prisma.city.findMany();
    return cities;
  } catch (error) {
    throw error;
  }
};
