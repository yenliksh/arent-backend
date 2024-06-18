import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';

import { ElasticsearchDocumentMapperBase } from '../base-classes/elasticsearch-document.mapper.base';
import { LongTermRentDocumentProps } from '../documents/long-term-rent.document';

export class LongTermRentDocumentMapper extends ElasticsearchDocumentMapperBase<
  LongTermRentDocumentProps,
  LongTermRentOrmEntity,
  ApartmentAdEntity
> {
  async ormEntityToDocument(ormEntity: LongTermRentOrmEntity): Promise<Result<LongTermRentDocumentProps, Error>> {
    if (!ormEntity.apartmentAd) {
      return Err(new Error('Long term rent should have apartmentAd relation'));
    }

    const props = await this.getPropsFromOrmEntity(ormEntity);

    if (!props) {
      return Err(new Error('Long term orm entity does not have required fields'));
    }

    return Ok(props);
  }

  async domainEntityToDocument(domainEntity: ApartmentAdEntity): Promise<Result<LongTermRentDocumentProps, Error>> {
    if (!domainEntity.isLongTermRent) {
      return Err(new Error('Apartment ad should have long term rent type'));
    }

    const props = await this.getPropsFromDomainEntity(domainEntity);

    if (!props) {
      return Err(new Error('Long term orm entity does not have required fields'));
    }

    return Ok(props);
  }

  protected async getPropsFromOrmEntity({
    id,
    updatedAt,
    createdAt,
    apartmentAd,
    cost,
    currency,
    apartmentAdId,
  }: LongTermRentOrmEntity): Promise<LongTermRentDocumentProps | undefined> {
    if (
      id == null ||
      updatedAt == null ||
      createdAt == null ||
      apartmentAd == null ||
      cost == null ||
      currency == null ||
      apartmentAdId == null
    ) {
      return;
    }

    const {
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      numberOfGuests,
      numberOfRooms,
      lat,
      lng,
      description: _description,
      rules: _rules,
      characteristics: _characteristics,
      media,
    } = apartmentAd;

    if (
      rentPeriodType == null ||
      apartmentType == null ||
      apartmentCategory == null ||
      numberOfGuests == null ||
      numberOfRooms == null ||
      lat == null ||
      lng == null ||
      _description == null ||
      _rules == null
    ) {
      return;
    }

    const { name, description, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = _description;
    const { allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = _rules;
    const {
      totalArea,
      landArea,
      territoryArea,
      objectArea,
      ceilingHeight,
      yearOfConstruction,
      floor,
      waterSupply,
      electricitySupply,
      gasSupply,
      objectPlacement,
      light,
      water,
      gas,
      sewerage,
      heating,
      ventilation,
    } = _characteristics!;

    if (
      name == null ||
      description == null ||
      remoteView == null ||
      selfCheckIn == null ||
      freeParking == null ||
      workSpace == null ||
      quite == null ||
      forFamily == null ||
      allowedToHangingOut == null ||
      allowedToSmoke == null ||
      allowedWithChildren == null ||
      allowedWithPets == null
    ) {
      return;
    }

    return {
      id,
      cost,
      currency,
      apartmentAdId,
      updatedAt,
      createdAt,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      numberOfGuests,
      numberOfRooms,

      // address location
      geoPoint: {
        lat,
        lon: lng,
      },

      // description field
      title: name,

      // media field
      photo: media?.photos[0].fileKey || '',

      remoteView,
      selfCheckIn,
      freeParking,
      workSpace,
      quite,
      forFamily,

      // rules fields
      allowedWithPets,
      allowedWithChildren,
      allowedToSmoke,
      allowedToHangingOut,

      //characteristics fields
      totalArea,
      landArea,
      territoryArea,
      objectArea,
      ceilingHeight,
      yearOfConstruction,
      floor,
      waterSupply,
      electricitySupply,
      gasSupply,
      objectPlacement,
      light,
      water,
      gas,
      sewerage,
      heating,
      ventilation,
    };
  }

  protected async getPropsFromDomainEntity(entity: ApartmentAdEntity): Promise<LongTermRentDocumentProps | undefined> {
    const apartmentAdProps = entity.getPropsCopy();

    const longTermRentProps = apartmentAdProps.longTermRent ? apartmentAdProps.longTermRent.getPropsCopy() : undefined;

    if (!longTermRentProps) {
      return;
    }

    const detailsProps = apartmentAdProps.details?.unpack();
    const details = {
      numberOfGuests: detailsProps?.numberOfGuests || 1,
      numberOfRooms: detailsProps?.numberOfRooms || null,
    };

    if (!details) {
      return;
    }

    const addressProps = apartmentAdProps.address?.unpack();
    const geoPoint = addressProps
      ? {
          lat: addressProps.geoPoint.lat,
          lon: addressProps.geoPoint.lng,
        }
      : undefined;

    if (!geoPoint) {
      return;
    }

    const description = apartmentAdProps.description?.unpack();

    if (!description) {
      return;
    }

    let rules = apartmentAdProps.rules?.unpack();

    let characteristics = apartmentAdProps.characteristics?.unpack();

    if (!rules) {
      rules = {
        allowedWithPets: null,
        allowedWithChildren: null,
        allowedToSmoke: null,
        allowedToHangingOut: null,
      };
    }

    if (!characteristics) {
      characteristics = {
        totalArea: null,
        landArea: null,
        territoryArea: null,
        objectArea: null,
        ceilingHeight: null,
        yearOfConstruction: null,
        floor: null,
        waterSupply: null,
        electricitySupply: null,
        gasSupply: null,
        objectPlacement: null,
        light: null,
        water: null,
        gas: null,
        sewerage: null,
        heating: null,
        ventilation: null,
      };
    }

    const id = longTermRentProps.id.value;
    const apartmentAdId = entity.id.value;
    const cost = longTermRentProps.costAndCurrency.cost;
    const currency = longTermRentProps.costAndCurrency.currency;
    const rentPeriodType = apartmentAdProps.rentPeriodType.value;
    const apartmentType = apartmentAdProps.apartmentType.value;
    const apartmentCategory = apartmentAdProps.apartmentCategory.value;
    const createdAt = longTermRentProps.createdAt.value;
    const updatedAt = longTermRentProps.updatedAt.value;
    const photo = apartmentAdProps.media?.unpack().photos[0].fileKey || '';
    const { name, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = description;

    return {
      id,
      apartmentAdId,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      cost,
      currency,
      photo,
      title: name,
      createdAt,
      updatedAt,
      geoPoint,
      remoteView: remoteView || null,
      selfCheckIn: selfCheckIn || null,
      freeParking: freeParking || null,
      workSpace: workSpace || null,
      quite: quite || null,
      forFamily: forFamily || null,
      ...details,
      ...rules,
      ...characteristics,
    };
  }
}
