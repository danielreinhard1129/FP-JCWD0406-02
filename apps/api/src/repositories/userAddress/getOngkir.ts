import prisma from '@/prisma';

export const getOngkir = async (
  origin: string,
  destination: string,
  weight: number,
  courier: string,
) => {
  try {
    const endpoint = 'cost'; // Assuming the API endpoint for cost calculation is 'cost'
    const payload = {
      origin, // Origin city ID
      destination, // Destination city ID
      weight, // Weight in grams
      courier, // Courier code (e.g., 'jne', 'tiki', 'pos')
    };

    return { endpoint, payload };
  } catch (error) {
    throw error;
  }
};
