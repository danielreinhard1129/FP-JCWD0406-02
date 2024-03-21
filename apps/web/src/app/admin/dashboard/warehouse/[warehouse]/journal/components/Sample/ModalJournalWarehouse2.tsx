// Define the props interface for the ModalJournalWarehouse component

export interface Product {
  id: number;
  title: string;
}

// Warehouse type for warehouse details
export interface Warehouse {
  name: string;
}

// Stock type for individual stock movements
export interface Stock {
  id: number;
  quantity: number;
  totalQuantity: number;
  type: string; // e.g., 'addition', 'reduction'
  createdAt: string;
  updatedAt: string;
  product: Product;
  warehouse: Warehouse;
}

// JournalEntry type for entries in the journal
export interface JournalEntry {
  id: number;
  product: Product;
  quantity: number;
  totalQuantity: number;
  type: string; // e.g., 'stockArrived', 'stockOut'
  createdAt: string;
  updatedAt: string;
  // Assuming journal contains an array of Stock movements
  journal: Stock[];
}

interface ModalProps {
  journals: Stock[]; // Array of Stock items to be displayed in the modal
  isOpen: boolean; // State to control if the modal is open or closed
  onClose: () => void; // Function to call when closing the modal
}

const ModalJournalWarehouse2 = ({ journals, isOpen, onClose }: ModalProps) => {
  //   if (!isOpen) return null; // If the modal isn't open, don't render anything

  console.log('show', journals);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>
          <h2 className="text-2xl font-bold">Journal Details</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="overflow-y-scroll">
          {journals.map((journal) => (
            <div key={journal.id} className="my-4">
              <div>Quantity: {journal.quantity}</div>
              <div>Total Quantity: {journal.totalQuantity}</div>
              <div>Type: {journal.type}</div>
              <div>
                Created At: {new Date(journal.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalJournalWarehouse2;
