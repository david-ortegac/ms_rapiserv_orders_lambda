import { DomainOrderEntity } from '../../../../../domain/Entities/DomainOrderEntity';
import { DomainProductEntity } from '../../../../../domain/Entities/DomainProductEntity';
import { AdapterOrderEntity } from '../Entity/AdapterOrderEntity';
import { AdapterProductEntity } from '../Entity/AdapterProductEntity';
import { IAdapterMapper } from './IAdapterMapper';

export class AdapterMapperImpl implements IAdapterMapper {
  toDomain(adapterEntity: AdapterOrderEntity): DomainOrderEntity {
    return {
      id: adapterEntity.id,
      tableNumber: adapterEntity.mesa,
      user: adapterEntity.cliente,
      products: adapterEntity.productos.map((product) => this.toDomainProduct(product)),
      tax: adapterEntity.impuesto,
      discount: adapterEntity.descuento,
      tips: adapterEntity.propina,
      subtotal: adapterEntity.subtotal,
      total: adapterEntity.total,
      status: adapterEntity.estado,
      createdAt: adapterEntity.fechaCreacion,
      updatedAt: adapterEntity.fechaActualizacion,
      createdBy: adapterEntity.creadoPor,
      updatedBy: adapterEntity.actualizadoPor,
    };
  }

  toAdapter(domainEntity: DomainOrderEntity): AdapterOrderEntity {
    return {
      id: domainEntity.id,
      mesa: domainEntity.tableNumber,
      cliente: domainEntity.user,
      productos: domainEntity.products.map((product) => this.toAdapterProduct(product)),
      impuesto: domainEntity.tax,
      descuento: domainEntity.discount,
      propina: domainEntity.tips,
      subtotal: domainEntity.subtotal,
      total: domainEntity.total,
      estado: domainEntity.status,
      fechaCreacion: domainEntity.createdAt,
      fechaActualizacion: domainEntity.updatedAt,
      creadoPor: domainEntity.createdBy,
      actualizadoPor: domainEntity.updatedBy,
    };
  }

  toDomainProduct(adapterEntity: AdapterProductEntity): DomainProductEntity {
    return {
      id: adapterEntity.id,
      quantity: adapterEntity.cantidad,
    };
  }
  toAdapterProduct(domainEntity: DomainProductEntity): AdapterProductEntity {
    return {
      id: domainEntity.id,
      cantidad: domainEntity.quantity,
    };
  }

  toDomainList(adapterList: AdapterOrderEntity[]): DomainOrderEntity[] {
    return adapterList.map((adapter) => this.toDomain(adapter));
  }
  toAdapterList(domainList: DomainOrderEntity[]): AdapterOrderEntity[] {
    return domainList.map((domain) => this.toAdapter(domain));
  }
}
