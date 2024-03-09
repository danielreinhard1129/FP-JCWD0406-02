import prisma from '@/prisma';
import { getWarehouseById } from '@/repositories/warehouse/warehouse/getWarehouseById';

interface Location {
  latitude: number;
  longitude: number;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function findNearestLocation(
  target: Location,
  locations: Location[],
): Location {
  let nearestLocation: Location | null = null;
  let minDistance = Infinity;

  for (const location of locations) {
    const distance = calculateDistance(
      target.latitude,
      target.longitude,
      location.latitude,
      location.longitude,
    );

    if (distance < minDistance) {
      // Update the comparison condition
      minDistance = distance;
      nearestLocation = location;
    }
    console.log('distance', distance);
    console.log('location :', location);
    console.log('min distance: ', minDistance);
    console.log('nearst location : ', nearestLocation);
  }

  if (!nearestLocation) {
    throw new Error('No locations provided');
  }

  return nearestLocation;
}

export const closestWarehouseToTheUser = async (id: number) => {
  try {
    // Retrieve the primary address of the user
    const userAddresses = await prisma.userAddress.findMany({
      where: {
        userId: id,
        isPrimary: true, // Filter to retrieve only the primary address
      },
      include: { City: true },
    });

    console.log('data userAddress', userAddresses);

    if (!userAddresses || userAddresses.length === 0) {
      throw new Error('Primary address not found for user');
    }

    // Retrieve all existing warehouses
    const warehouses = await prisma.warehouse.findMany();

    // Extract the latitude and longitude of the user's primary address
    const userPrimaryAddress = userAddresses[0]; // Assuming the first address is primary
    const userLocation: Location = {
      latitude: userPrimaryAddress.latitude!,
      longitude: userPrimaryAddress.longitude!,
    };

    // Extract the latitude and longitude of all warehouses
    const warehouseLocations: Location[] = warehouses.map((warehouse) => ({
      latitude: warehouse.latitude!,
      longitude: warehouse.longitude!,
    }));

    // Find the nearest warehouse to the user's address
    const closestWarehouse = findNearestLocation(
      userLocation,
      warehouseLocations,
    );

    // Find the warehouse ID corresponding to the closest warehouse
    const closestWarehouseId = warehouses.find(
      (warehouse) =>
        warehouse.latitude === closestWarehouse.latitude &&
        warehouse.longitude === closestWarehouse.longitude,
    )?.id;

    if (!closestWarehouseId) {
      throw new Error('No closest warehouse found');
    }

    const dataClosestWarehouse = await getWarehouseById(closestWarehouseId);

    return {
      message: 'This is the closest warehouse',
      data: dataClosestWarehouse,
    };
  } catch (error) {
    throw error;
  }
};
