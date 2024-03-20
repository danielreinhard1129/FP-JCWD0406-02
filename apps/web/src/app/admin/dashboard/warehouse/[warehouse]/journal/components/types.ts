// types.ts

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
}

export interface ISummary {
  currentStock: number;
  product: IProduct;
  stockArrived: number;
  stockOut: number;
}

export interface IJournalEntry {
  id: number;
  quantity: number;
  totalQuantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDataEntry {
  id: number;
  createdAt: string;
  journal: IJournalEntry[];
  product: IProduct;
  warehouseId: number;
  quantity: number;
  updatedAt: string;
}

export interface IJournalResponse {
  data: IDataEntry[];
  message: string;
  summary: ISummary[];
}

export interface JournalModalProps {
  journals: IJournalEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export interface JournalSummaryProps {
  summary: ISummary[];
  onShowJournal: (productId: number) => void;
}
