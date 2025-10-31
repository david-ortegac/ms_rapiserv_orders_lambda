import { Orders } from '../Entity/Orders';

export interface MysqlOrderRespository {
  findById(id: number): Promise<Orders | null>;
  findAll(): Promise<Orders[]>;
  create(order: Orders): Promise<Orders>;
  update(order: Orders): Promise<Orders>;
  delete(id: number): Promise<void>;
}
