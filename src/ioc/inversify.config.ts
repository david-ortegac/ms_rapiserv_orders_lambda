import { Container } from 'inversify';
import { Repository } from 'typeorm';

import { AdapterMapperImpl } from '../adapter/restful/v1/controller/Mapper/AdapterMapperImpl';
import { IAdapterMapper } from '../adapter/restful/v1/controller/Mapper/IAdapterMapper';
import { OrderController } from '../adapter/restful/v1/controller/OrderController';
import { OrderControllerImpl } from '../adapter/restful/v1/controller/OrderControllerImpl';
import { IOrderService } from '../application/services/IOrderService';
import { OrderServiceImpl } from '../domain/OrderServiceImpl';
import { AppDataSource } from '../infraestructure/mysql/data-source';
import { Orders } from '../infraestructure/mysql/Entity/Orders';
import { IInfraestructureMapper } from '../infraestructure/mysql/Mapper/IIfraestructureMapper';
import { InfraestructureMapperImpl } from '../infraestructure/mysql/Mapper/InfraestructureMapperImpl';
import { MysqlOrderRespository } from '../infraestructure/mysql/Respository/MysqlOrderRespository';
import { MysqlOrderRespositoryImpl } from '../infraestructure/mysql/Respository/MysqlOrderRespositoryImpl';
import { TYPES } from './Types';

const container = new Container();

// Función factory para el Repository
const createOrderRepository = (): Repository<Orders> => {
  return AppDataSource.getRepository(Orders);
};

// Configurar DataSource
container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

// Configurar Repository<Product>
container.bind<Repository<Orders>>(TYPES.RepositoryOrder).toDynamicValue(createOrderRepository);

container.bind<IOrderService>(TYPES.OrderService).to(OrderServiceImpl);
container.bind<MysqlOrderRespository>(TYPES.MysqlOrderRespository).to(MysqlOrderRespositoryImpl);
container.bind<IInfraestructureMapper>(TYPES.IInfraestructureMapper).to(InfraestructureMapperImpl);
container.bind<IAdapterMapper>(TYPES.IAdapterMapper).to(AdapterMapperImpl);
container.bind<OrderController>(TYPES.OrderController).to(OrderControllerImpl);

export { container };
