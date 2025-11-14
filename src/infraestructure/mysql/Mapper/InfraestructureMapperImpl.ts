import { DomainOrderEntity } from '../../../domain/Entities/DomainOrderEntity';
import { DomainProductEntity } from '../../../domain/Entities/DomainProductEntity';
import { Orders } from '../Entity/Orders';
import { Product } from '../Entity/Product';
import { IInfraestructureMapper } from './IIfraestructureMapper';

export class InfraestructureMapperImpl implements IInfraestructureMapper {
  toDomain(entity: Orders): DomainOrderEntity {
    return {
      id: entity.id,
      tableNumber: entity.table_number,
      user: entity.user,
      products: entity.products.map((product) => this.toDomainProduct(product)),
      tax: entity.tax,
      discount: entity.discount,
      tips: entity.tips,
      subtotal: entity.subtotal,
      total: entity.total,
      status: entity.status,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      createdBy: entity.created_by,
      updatedBy: entity.updated_by,
    };
  }
  toEntity(domain: DomainOrderEntity): Orders {
    return {
      id: domain.id,
      table_number: domain.tableNumber,
      user: domain.user,
      products: domain.products.map((product) => this.toEntityProduct(product)),
      tax: domain.tax,
      discount: domain.discount,
      tips: domain.tips,
      subtotal: domain.subtotal,
      total: domain.total,
      status: domain.status,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      created_by: domain.createdBy,
      updated_by: domain.updatedBy,
    } as Orders;
  }

  toDomainProduct(entity: Product): DomainProductEntity {
    return {
      id: entity.id,
      quantity: entity.quantity,
    };
  }

  toEntityProduct(domain: DomainProductEntity): Product {
    return {
      id: domain.id,
      quantity: domain.quantity,
    } as Product;
  }

  toDomainList(entityList: Orders[]): DomainOrderEntity[] {
    return entityList.map((entity) => this.toDomain(entity));
  }
  toEntityList(domainList: DomainOrderEntity[]): Orders[] {
    return domainList.map((domain) => this.toEntity(domain));
  }
}
