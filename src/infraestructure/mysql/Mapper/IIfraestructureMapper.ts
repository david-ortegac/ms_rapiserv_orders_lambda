import { DomainOrderEntity } from '../../../domain/Entities/DomainOrderEntity';
import { Orders } from '../Entity/Orders';

export interface IInfraestructureMapper {
  toDomain(entity: Orders): DomainOrderEntity;
  toEntity(domain: DomainOrderEntity): Orders;
  toDomainList(entityList: Orders[]): DomainOrderEntity[];
  toEntityList(domainList: DomainOrderEntity[]): Orders[];
}
