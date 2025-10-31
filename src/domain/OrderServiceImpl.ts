import { inject, injectable } from 'inversify';

import { IOrderService } from '../application/services/IOrderService';
import { InfraestructureMapperImpl } from '../infraestructure/mysql/Mapper/InfraestructureMapperImpl';
import { MysqlOrderRespository } from '../infraestructure/mysql/Respository/MysqlOrderRespository';
import { TYPES } from '../ioc/Types';
import { DomainOrderEntity } from './Entities/DomainOrderEntity';

@injectable()
export class OrderServiceImpl implements IOrderService {
  constructor(
    @inject(TYPES.MysqlOrderRespository)
    private readonly repository: MysqlOrderRespository,
    @inject(TYPES.IInfraestructureMapper)
    private readonly mapper: InfraestructureMapperImpl
  ) {}

  async getOrders(): Promise<DomainOrderEntity[]> {
    const orders = await this.repository.findAll();
    if (!orders) {
      throw new Error('Orders not found');
    }
    return this.mapper.toDomainList(orders);
  }

  async getOrderById(id: number): Promise<DomainOrderEntity> {
    const order = await this.repository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return this.mapper.toDomain(order);
  }

  async createOrder(order: DomainOrderEntity): Promise<DomainOrderEntity> {
    console.log('order from domain service', order);
    const entity = this.mapper.toEntity(order);
    console.log('entity from domain service', entity);
    const createdOrder = await this.repository.create(entity);
    return this.mapper.toDomain(createdOrder);
  }

  async updateOrder(id: number, order: DomainOrderEntity): Promise<DomainOrderEntity> {
    const orderEntity = await this.repository.findById(id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    const entity = this.mapper.toEntity({ ...orderEntity, ...order });
    const updatedOrder = await this.repository.update(entity);
    return this.mapper.toDomain(updatedOrder);
  }

  async deleteOrder(id: number): Promise<void> {
    const orderEntity = await this.repository.findById(id);
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    await this.repository.delete(id);
  }
}
