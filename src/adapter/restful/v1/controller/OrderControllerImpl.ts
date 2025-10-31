import { inject, injectable } from 'inversify';

import { OrderService } from '../../../../application/services/IOrderService';
import { TYPES } from '../../../../ioc/Types';
import { AdapterOrderEntity } from './Entity/AdapterOrderEntity';
import { IAdapterMapper } from './Mapper/IAdapterMapper';
import { OrderController } from './OrderController';

@injectable()
export class OrderControllerImpl implements OrderController {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderService,
    @inject(TYPES.IAdapterMapper) private readonly mapper: IAdapterMapper
  ) {}

  async handleRequest(event: any): Promise<any> {
    try {
      switch (event?.requestContext?.http?.method) {
        case 'GET': {
          if (event?.pathParameters?.id) {
            const order = await this.getOrderById(Number.parseInt(event?.pathParameters?.id));
            return order;
          } else {
            const orders = await this.getOrders();
            return orders;
          }
        }

        case 'POST': {
          const createdOrder = await this.createOrder(JSON.parse(event?.body));
          return createdOrder;
        }

        case 'PUT': {
          if (event?.pathParameters?.id) {
            const updatedOrder = await this.updateOrder(
              Number.parseInt(event?.pathParameters?.id),
              JSON.parse(event?.body)
            );
            return updatedOrder;
          }
          return 'ID is required for PUT request';
        }

        case 'DELETE': {
          if (event?.pathParameters?.id) {
            await this.deleteOrder(Number.parseInt(event?.pathParameters?.id));
            return {
              message: 'Order deleted successfully',
            };
          }
          return {
            message: 'ID is required for DELETE request',
          };
        }

        default:
          return {
            message: `Unsupported HTTP method: ${event?.requestContext?.http?.method}`,
          };
      }
    } catch (error) {
      return {
        message: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  async getOrders(): Promise<AdapterOrderEntity[]> {
    const orders = await this.orderService.getOrders();
    return this.mapper.toAdapterList(orders);
  }

  async getOrderById(id: number): Promise<AdapterOrderEntity> {
    const order = await this.orderService.getOrderById(id);
    return this.mapper.toAdapter(order);
  }

  async createOrder(order: AdapterOrderEntity): Promise<AdapterOrderEntity> {
    const orderEntity = this.mapper.toDomain(order);
    const createdOrder = await this.orderService.createOrder(orderEntity);
    return this.mapper.toAdapter(createdOrder);
  }

  async updateOrder(id: number, order: AdapterOrderEntity): Promise<AdapterOrderEntity> {
    console.log('order from controller', order);
    const orderEntity = this.mapper.toDomain(order);
    console.log('orderEntity from controller', orderEntity);
    const updatedOrder = await this.orderService.updateOrder(id, orderEntity);
    return this.mapper.toAdapter(updatedOrder);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
