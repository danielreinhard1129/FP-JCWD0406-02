import prisma from '@/prisma';
import { findTransactionAndDetailsById } from '@/repositories/transaction/findTransactionAndDetailById';
import { Status } from '@prisma/client';

// Function to calculate the distance between two points based on latitude and longitude
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

// Main function for automatic mutation action
export const automaticMutationAction = async (id: number) => {
  try {
    const transaction = await findTransactionAndDetailsById(id);
    console.log('check Transaction :', transaction);

    if (transaction?.TransactionStatus == 'IN_PROGRESS') {
      const cart = await prisma.transactionDetails.findMany({
        where: { transactionId: id },
        select: { id: true, productId: true, quantity: true },
      });
      console.log('Check Cart :', cart);

      // Check if cart is not empty and has at least one item
      if (cart.length > 0) {
        // Iterate over each item in the cart array
        for (const item of cart) {
          // Access productId and quantity properties of each item
          const { id: detailId, productId, quantity } = item;

          // Retrieve the stock quantity from the stock table
          const stock = await prisma.stock.findFirst({
            where: {
              AND: [{ warehouseId: transaction.warehouseId }, { productId }],
            },
          });

          // Check if stock is available and quantity is less than the required quantity
          if (stock && stock.quantity < quantity) {
            // Perform auto mutation

            // Retrieve all existing warehouses
            const warehouses = await prisma.warehouse.findMany();

            // Define the target location based on the transaction's warehouse
            const targetWarehouse = warehouses.find(
              (warehouse) => warehouse.id === transaction.warehouseId,
            );

            let closestWarehouseId;
            let minDistance = Infinity;
            for (const warehouse of warehouses) {
              try {
                const distance = calculateDistance(
                  targetWarehouse?.latitude!,
                  targetWarehouse?.longitude!,
                  warehouse.latitude!,
                  warehouse.longitude!,
                );
                if (
                  distance < minDistance &&
                  warehouse.id !== transaction.warehouseId
                ) {
                  minDistance = distance;
                  closestWarehouseId = warehouse.id;
                }
              } catch (error) {
                console.error('Error calculating distance:', error);
              }
            }

            // Ensure closestWarehouseId is defined before proceeding
            if (closestWarehouseId) {
              // Retrieve reqWarehouseId from transaction or provide a default value
              const reqWarehouseId = transaction.warehouseId;

              // Perform stock mutation using the closest warehouse ID
              const create = await prisma.stockMutation.create({
                data: {
                  initialWarehouseId: closestWarehouseId,
                  destinationWarehouseId: reqWarehouseId,
                  status: Status.CONFIRM,
                  stockMutationDetail: {
                    create: {
                      productId,
                      quantity,
                    },
                  },
                },
              });
            }
          }
        }
      }
    }
    return {
      message: 'stock auto-updated',
    };
  } catch (error) {
    throw error;
  }
};
