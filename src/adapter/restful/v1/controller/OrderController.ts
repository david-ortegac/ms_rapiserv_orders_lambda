import { AdapterOrderEntity } from './Entity/AdapterOrderEntity';

export interface OrderController {
  handleRequest(event: any): Promise<any>;
  getOrders(): Promise<AdapterOrderEntity[]>;
  getOrderById(id: number): Promise<AdapterOrderEntity>;
  createOrder(order: AdapterOrderEntity): Promise<AdapterOrderEntity>;
  updateOrder(id: number, order: AdapterOrderEntity): Promise<AdapterOrderEntity>;
  deleteOrder(id: number): Promise<void>;
}
