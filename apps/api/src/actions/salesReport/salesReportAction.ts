import { salesReport } from '@/repositories/salesReport/salesReportAllWarehouse';
import { salesReportByProduct } from '@/repositories/salesReport/salesReportByProduct';
import { salesReportByCategory } from '@/repositories/salesReport/salesReportByCategory';
import { salesReportByWarehouse } from '@/repositories/salesReport/salesReportByWarehouse';

export const salesReportAction = async (
  warehouseId: number,
  productId: number,
  categoryId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    // if (startDate && endDate) {
    //   const report = await salesReport(startDate, endDate);
    //   return {
    //     message: 'sales report',
    //     data: report,
    //   };
    // }

    if (warehouseId && startDate && endDate) {
      const report = await salesReportByWarehouse(
        warehouseId,
        startDate,
        endDate,
      );

      return {
        message: 'sales report warehous ',
        data: report,
      };
    }

    if (productId && startDate && endDate) {
      const salesReportProduct = await salesReportByProduct(
        productId,
        startDate,
        endDate,
      );
      return {
        message: 'sales report by product',
        data: salesReportProduct,
      };
    }

    if (categoryId && startDate && endDate) {
      const salesReportCategory = await salesReportByCategory(
        categoryId,
        startDate,
        endDate,
      );

      return {
        message: 'Sales report by category',
        data: salesReportCategory,
      };
    }
  } catch (error) {
    throw error;
  }
};
