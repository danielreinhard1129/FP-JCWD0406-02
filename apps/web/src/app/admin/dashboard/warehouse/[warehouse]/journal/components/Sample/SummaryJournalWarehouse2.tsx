// Define the component accepting the props
export interface ProductDetail {
  id: number;
  title: string;
}

export interface SummaryData {
  currentStock: number;
  product: ProductDetail;
  stockArrived: number;
  stockOut: number;
  title: string;
}

const SummaryJournalWarehouseCard2 = ({
  summary,
  onShowJournal,
}: {
  summary: SummaryData[];
  onShowJournal: (productId: number) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {summary.map((item) => (
        <div
          key={item.product?.id}
          className="card bg-white shadow-md rounded-lg p-4"
        >
          <div className="card-body">
            <h5 className="card-title font-bold">{item.title}</h5>
            <p className="text-gray-700">Stock Arrived: {item.stockArrived}</p>
            <p className="text-gray-700">Stock Out: {item.stockOut}</p>
            <p className="text-gray-700">Current Stock: {item.currentStock}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary mt-4"
                onClick={() => onShowJournal(item.product?.id)}
              >
                Show Journal Detail
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryJournalWarehouseCard2;
