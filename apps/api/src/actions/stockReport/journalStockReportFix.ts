import { journalStockReportFix } from '@/repositories/stockReport/journalStockReportFix';

// Define interfaces
interface Product {
  id: number;
  title: string;
  // Add any other properties of Product interface here
}

interface JournalEntry {
  quantity: number;
  type: string;
  // Add any other properties of JournalEntry interface here
}

interface Entry {
  quantity: number;
  product: Product;
  journal: JournalEntry[];
}

// Define interfaces for summary
interface SummaryEntry {
  productId: number;
  title: string;
  stockArrived: number;
  stockOut: number;
  currentStock: number;
}

// Function to calculate stock summary
const calculateStockSummary = (data: Entry[]): SummaryEntry[] => {
  // Initialize summary array
  const summary: SummaryEntry[] = [];

  // Loop through each stock entry
  data.forEach((entry) => {
    const { product, journal } = entry;
    let stockArrived = 0;
    let stockOut = 0;

    // Loop through journal entries to calculate total quantities
    journal.forEach((journalEntry) => {
      const { quantity, type } = journalEntry;

      // Convert type to lowercase for case-insensitive matching
      const lowercaseType = type.toLowerCase();

      // Update stock based on journal entry type
      if (
        lowercaseType.includes('addition') ||
        lowercaseType === 'added new stock' ||
        lowercaseType === 'addition from mutation'
      ) {
        stockArrived += quantity;
      } else if (
        lowercaseType.includes('reduction') ||
        lowercaseType === 'reduction from mutation' ||
        lowercaseType === 'shipped to user'
      ) {
        stockOut += quantity;
      }
    });

    // Calculate current stock
    const currentStock = stockArrived - stockOut;

    // Push summary entry
    summary.push({
      productId: product.id,
      title: product.title,
      stockArrived,
      stockOut,
      currentStock,
    });
  });

  return summary;
};

// Main function
export const journalStockReportFixAction = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
): Promise<{ message: string; data: any; summary: SummaryEntry[] }> => {
  try {
    const report = await journalStockReportFix(warehouseId, startDate, endDate);

    // Transform report into formatted data
    const formattedReport: Entry[] = report.flatMap((product) =>
      product.Stock.map((stock) => ({
        quantity: stock.quantity,
        product: {
          id: product.id,
          title: product.title,
        },
        journal: stock.journal.map((entry) => ({
          quantity: entry.totalQuantity,
          type: entry.type,
        })),
      })),
    );

    // Calculate stock summary
    const summary = calculateStockSummary(formattedReport);

    return {
      message: 'stock report',
      data: report,
      summary,
      // summary: summary,
    };
  } catch (error) {
    throw error;
  }
};
