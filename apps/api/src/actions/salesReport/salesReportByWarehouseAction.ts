import { salesReportByWarehouseId } from '@/repositories/salesReport/salesReportByWarehouseId';
import { salesReportCategoryByWarehouseId } from '@/repositories/salesReport/salesReportCategoryByWarehouseId';
import { salesReportProductByWarehouseId } from '@/repositories/salesReport/salesReportProductByWarehouseId';

export const salesReportByWarehouse = async (
  warehouseId: number,
  productId: number,
  categoryId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    if (warehouseId && startDate && endDate) {
      const report = await salesReportByWarehouseId(
        warehouseId,
        startDate,
        endDate,
      );

      return {
        message: 'Sales report by warehouse Id',
        data: report,
      };
    }

    if (categoryId && warehouseId && startDate && endDate) {
      const report = await salesReportCategoryByWarehouseId(
        categoryId,
        warehouseId,
        startDate,
        endDate,
      );
      return {
        message: 'Sales Report warehouse By Category',
        data: report,
      };
    }

    if (productId && warehouseId && startDate && endDate) {
      const report = await salesReportProductByWarehouseId(
        productId,
        warehouseId,
        startDate,
        endDate,
      );

      return {
        message: 'Sales report warehouse by ',
        data: report,
      };
    }
  } catch (error) {
    throw error;
  }
};
