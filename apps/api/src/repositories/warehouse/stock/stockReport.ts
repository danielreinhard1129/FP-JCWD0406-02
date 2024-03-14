import prisma from '@/prisma';

interface Summary {
  [key: string]: {
    addition: number;
    reduction: number;
    endingStock: number;
  };
}

export const stockReport = async () => {
  try {
    // Fetch all stock records with associated journal entries
    const allStock = await prisma.stock.findMany({
      include: {
        journal: true,
      },
    });

    // Calculate summary of stock reports for all products per month
    const summary: Summary = allStock.reduce((acc, curr) => {
      // Iterate through each journal entry for the current stock item
      curr.journal.forEach((entry) => {
        const monthYearKey = `${
          entry.createdAt.getMonth() + 1
        }-${entry.createdAt.getFullYear()}`;

        // Initialize the month-year key in the accumulator if not present
        if (!acc[monthYearKey]) {
          acc[monthYearKey] = {
            addition: 0,
            reduction: 0,
            endingStock: 0,
          };
        }

        // Increment addition or reduction based on the type
        if (
          entry.type.includes('addition') ||
          entry.type === 'added from mutation' ||
          entry.type === 'added new stock'
        ) {
          acc[monthYearKey].addition += entry.quantity;
        } else if (
          entry.type.includes('reduction') ||
          entry.type === 'reduction from mutation'
        ) {
          acc[monthYearKey].reduction += entry.quantity;
        }
      });

      return acc;
    }, {} as Summary);

    // Calculate ending stock by summing up the quantities from all stock records
    for (const stock of allStock) {
      const monthYearKey = `${
        stock.createdAt.getMonth() + 1
      }-${stock.createdAt.getFullYear()}`;
      summary[monthYearKey].endingStock += stock.quantity;
    }

    return {
      summary,
      detailedReports: allStock,
    };
  } catch (error) {
    throw error;
  }
};
