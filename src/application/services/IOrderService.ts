import { DomainOrderEntity } from '../../domain/Entities/DomainOrderEntity';

export interface IOrderService {
  getOrders(): Promise<DomainOrderEntity[]>;
  getOrderById(id: number): Promise<DomainOrderEntity>;
  createOrder(order: DomainOrderEntity): Promise<DomainOrderEntity>;
  updateOrder(id: number, order: DomainOrderEntity): Promise<DomainOrderEntity>;
  deleteOrder(id: number): Promise<void>;
}
