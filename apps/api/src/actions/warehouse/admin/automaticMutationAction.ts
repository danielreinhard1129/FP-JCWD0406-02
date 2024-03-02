import prisma from '@/prisma';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';

// Function to calculate the distance between two points based on latitude and longitude
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  console.log('dataaaaaaaaaaaaaaaaaaaaaa', lat1, lon1, lat2, lon2);

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

// Main function for automatic mutation action
export const automaticMutationAction = async (id: number) => {
  try {
    const transaction = await getTransactionById(id);

    if (transaction?.status === 'CONFIRM') {
      const cart = await prisma.cart.findFirst({
        // where: { id: transaction }, // Use 'id' instead of 'cartId'
        select: { productId: true, quantity: true },
      });

      if (cart) {
        const { productId, quantity } = cart;

        // Retrieve all existing warehouses
        const warehouses = await prisma.warehouse.findMany();

        // Define the target location based on the transaction's warehouse
        const targetWarehouse = warehouses.find(
          (warehouse) => warehouse.id === transaction.warehouseId,
        );

        console.log('Target warehouse:', targetWarehouse);

        let closestWarehouseId;
        let minDistance = Infinity;
        for (const warehouse of warehouses) {
          console.log('Calculating distance for warehouse:', warehouse);
          try {
            const distance = calculateDistance(
              targetWarehouse?.latitude!,
              targetWarehouse?.longitude!,
              warehouse.latitude!,
              warehouse.longitude!,
            );
            console.log('Distance:', distance);
            if (
              distance < minDistance &&
              warehouse.id !== transaction.warehouseId
            ) {
              minDistance = distance;
              closestWarehouseId = warehouse.id;
              console.log('New closest warehouse:', warehouse);
            }
          } catch (error) {
            console.error('Error calculating distance:', error);
          }
        }

        // Ensure closestWarehouseId is defined before proceeding
        if (closestWarehouseId) {
          // Retrieve the stock quantity from the closest warehouse
          const stock = await prisma.stock.findFirst({
            where: {
              AND: [{ warehouseId: closestWarehouseId }, { productId }],
            },
          });

          if (stock) {
            // Retrieve reqWarehouseId from transaction or provide a default value
            const reqWarehouseId = transaction.warehouseId;

            // Perform stock mutation using the closest warehouse ID
            // await prisma.stockMutation.create({
            // data: {
            // productId,
            // quantity: quantity - stock.quantity, // Calculate the difference
            // warehouseId: closestWarehouseId, // Use the closest warehouse ID
            // reqWarehouseId, // Provide reqWarehouseId
            // status: 'CONFIRM', // Assuming the mutation is immediately confirmed
            // },
            // });
          }
        }
      }
      return {
        message: 'stock auto-updated',
      };
    }
  } catch (error) {
    throw error;
  }
};
