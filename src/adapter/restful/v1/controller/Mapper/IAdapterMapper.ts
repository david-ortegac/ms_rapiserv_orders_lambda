import { DomainOrderEntity } from '../../../../../domain/Entities/DomainOrderEntity';
import { AdapterOrderEntity } from '../Entity/AdapterOrderEntity';

export interface IAdapterMapper {
  toDomain(adapterEntity: AdapterOrderEntity): DomainOrderEntity;
  toAdapter(domainEntity: DomainOrderEntity): AdapterOrderEntity;
  toDomainList(adapterList: AdapterOrderEntity[]): DomainOrderEntity[];
  toAdapterList(domainList: DomainOrderEntity[]): AdapterOrderEntity[];
}
