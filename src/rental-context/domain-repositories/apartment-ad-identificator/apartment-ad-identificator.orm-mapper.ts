import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class ApartmentAdIdentificatorOrmMapper extends OrmMapper<
  ApartmentAdIdentificatorEntity,
  ApartmentAdIdentificatorOrmEntity
> {
  protected toDomainProps(
    ormEntity: ApartmentAdIdentificatorOrmEntity,
  ): Promise<EntityProps<ApartmentAdIdentificatorProps>> {
    const id = new UUID(ormEntity.id);

    const apartmentId = new UUID(ormEntity.apartmentId);

    const props: ApartmentAdIdentificatorProps = {
      apartmentId,
      adSearchId: ormEntity.adSearchId,
      titleSeo: ormEntity.titleSeo,
      keywordsSeo: ormEntity.keywordsSeo,
      descriptionSeo: ormEntity.descriptionSeo,
    };

    return Promise.resolve({ id, props });
  }

  protected async toOrmProps(
    entity: ApartmentAdIdentificatorEntity,
  ): Promise<OrmEntityProps<ApartmentAdIdentificatorOrmEntity>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ApartmentAdIdentificatorOrmEntity> = {
      apartmentId: props.apartmentId.value,
      titleSeo: props.titleSeo!,
      keywordsSeo: props.keywordsSeo,
      descriptionSeo: props.descriptionSeo,
    };

    return ormProps;
  }
}
