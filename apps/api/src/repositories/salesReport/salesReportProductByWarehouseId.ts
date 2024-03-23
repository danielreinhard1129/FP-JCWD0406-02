import prisma from '@/prisma';

export const salesReportProductByWarehouseId = async (
  productId: number,
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const salesReporProduct = await prisma.product.findMany({
      where: {
        transactionDetails: {
          some: {
            productId: productId,
            Transaction: {
              warehouseId: warehouseId,
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      },
      include: {
        transactionDetails: {
          include: {
            Transaction: {
              include: {
                Warehouse: true,
              },
            },
          },
        },
      },
    });
    return salesReporProduct;
  } catch (error) {
    throw error;
  }
};
