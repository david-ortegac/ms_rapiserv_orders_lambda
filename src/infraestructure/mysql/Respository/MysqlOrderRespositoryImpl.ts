import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';

import { TYPES } from '../../../ioc/Types';
import { Orders } from '../Entity/Orders';
import { MysqlOrderRespository } from './MysqlOrderRespository';

@injectable()
export class MysqlOrderRespositoryImpl implements MysqlOrderRespository {
  constructor(
    @inject(TYPES.RepositoryOrder)
    private readonly orderRepository: Repository<Orders>
  ) {}

  async findById(id: number): Promise<Orders | null> {
    return (await this.orderRepository.findOne({ where: { id } })) ?? null;
  }

  async findAll(): Promise<Orders[]> {
    return await this.orderRepository.find();
  }

  async create(order: Orders): Promise<Orders> {
    console.log('order from repository', order);
    return await this.orderRepository.save(order);
  }

  async update(order: Orders): Promise<Orders> {
    return await this.orderRepository.save(order);
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
