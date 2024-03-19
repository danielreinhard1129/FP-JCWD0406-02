import { journalStockReportFix } from '@/repositories/stockReport/journalStockReportFix';

// Define interfaces
interface Product {
  id: number;
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

interface SummaryEntry {
  product: Product;
  stockArrived: number;
  stockOut: number;
  currentStock: number;
}

// Function to calculate stock summary
export const calculateStockSummary = (data: Entry[]): SummaryEntry[] => {
  // Initialize summary object
  const summary: { [productId: number]: SummaryEntry } = {};

  // Loop through each stock entry
  data.forEach((entry) => {
    const { product, journal } = entry;

    // Initialize product summary if not exists
    if (!summary[product.id]) {
      summary[product.id] = {
        product: product,
        stockArrived: 0,
        stockOut: 0,
        currentStock: entry.quantity,
      };
    }

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
        summary[product.id].stockArrived += quantity;
      } else if (
        lowercaseType.includes('reduction') ||
        lowercaseType === 'shipped to user'
      ) {
        summary[product.id].stockOut += quantity;
      }
    });
  });

  // Calculate current stock after adjustments
  Object.values(summary).forEach((productSummary) => {
    productSummary.currentStock += productSummary.stockArrived;
    productSummary.currentStock -= productSummary.stockOut;
  });

  return Object.values(summary);
};

// Main function
export const journalStockReportFixAction = async (
  warehouseId: number,
  startDate: string,
  endDate: string,
): Promise<{ message: string; data: any; summary: SummaryEntry[] }> => {
  try {
    const report = await journalStockReportFix(warehouseId, startDate, endDate);
    // console.dir(report, { depth: null });

    const summary = calculateStockSummary(report);

    console.log('check summary : ', summary);

    return {
      message: 'stock report',
      data: report,
      summary: summary,
    };
  } catch (error) {
    throw error;
  }
};
