import prisma from '@/prisma';

export const journalStockReport = async (
  warehouseIds: number[],
  start: string,
  end: string,
) => {
  try {
    // console.log('check warehouse name : ', warehouse.name);

    // Convert Date objects to ISO-8601 DateTime strings
    // const isoStartDate = startDate.toISOString();
    // const isoEndDate = endDate.toISOString();

    // console.log('check isoEndDate : ', isoEndDate);
    // console.log('check isoStartDate : ', isoStartDate);

    const report = await prisma.journalStock.findMany({
      where: {
        AND: [
          {
            Stock: {
              warehouseId: {
                in: warehouseIds,
              },
            },
          },
          {
            createdAt: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
      include: {
        Stock: {
          include: {
            warehouse: true,
            product: true,
          },
        },
      },
    });

    return report;
  } catch (error) {
    throw error;
  }
};
