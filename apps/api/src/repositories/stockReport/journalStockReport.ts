import prisma from '@/prisma';

export const journalStockReport = async (
  start: string,
  warehouseName: string,
  end: string,
) => {
  try {
    console.log('repossss', start, end);

    // console.log('warehouse name : ', warehouseName);

    const report = await prisma.journalStock.findMany({
      where: {
        Stock: {
          warehouse: {
            name: {
              contains: warehouseName,
            },
          },
        },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        Stock: {
          include: {
            product: true,
            warehouse: true,
          },
        },
      },
    });

    console.log('repository result', report);

    return report;
  } catch (error) {
    throw error;
  }
};
