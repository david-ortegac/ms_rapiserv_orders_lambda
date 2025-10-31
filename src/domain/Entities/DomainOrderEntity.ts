import { DomainProductEntity } from './DomainProductEntity';

export interface DomainOrderEntity {
  id?: number;
  tableNumber: number;
  user: string;
  products: DomainProductEntity[];
  tax: number;
  discount: number;
  tips: number;
  subtotal: number;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
