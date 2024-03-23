import prisma from '@/prisma';

export const salesReportByWarehouseId = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const salesReport = await prisma.warehouse.findMany({
      where: {
        transaction: {
          some: {
            warehouseId: warehouseId,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        transaction: true,
      },
    });
    return salesReport;
  } catch (error) {
    throw error;
  }
};
