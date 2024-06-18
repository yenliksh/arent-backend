import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { ContractStatus } from '@infrastructure/enums';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';

import { ElasticsearchDocumentMapperBase } from '../base-classes/elasticsearch-document.mapper.base';
import { ShortTermRentDocumentProps } from '../documents/short-term-rent.document';
import { LockedDates } from '../documents/types';

export class ShortTermRentDocumentMapper extends ElasticsearchDocumentMapperBase<
  ShortTermRentDocumentProps,
  ShortTermRentOrmEntity,
  ApartmentAdEntity
> {
  async ormEntityToDocument(ormEntity: ShortTermRentOrmEntity): Promise<Result<ShortTermRentDocumentProps, Error>> {
    if (!ormEntity.apartmentAd) {
      return Err(new Error('Short term rent should have apartmentAd relation'));
    }

    const props = await this.getPropsFromOrmEntity(ormEntity);

    if (!props) {
      return Err(new Error('Short term orm entity does not have required fields'));
    }

    return Ok(props);
  }

  async domainEntityToDocument(domainEntity: ApartmentAdEntity): Promise<Result<ShortTermRentDocumentProps, Error>> {
    if (!domainEntity.isShortTermRent) {
      return Err(new Error('Apartment ad should have short term rent type'));
    }

    const props = await this.getPropsFromDomainEntity(domainEntity);

    if (!props) {
      return Err(new Error('Short term orm entity does not have required fields'));
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
    cancellationPolicy,
    rentBookingType,
    arrivalTime,
    departureTime,
    apartmentAdId,
    bookingAccessInMonths = 0,
  }: ShortTermRentOrmEntity): Promise<ShortTermRentDocumentProps | undefined> {
    if (
      id == null ||
      updatedAt == null ||
      createdAt == null ||
      apartmentAd == null ||
      cost == null ||
      currency == null ||
      apartmentAdId == null ||
      rentBookingType == null
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

    if (name == null || description == null) {
      return;
    }

    const shortTermRentLockedDates = await ShortTermRentLockedDateOrmEntity.query().where('shortTermRentId', id);
    // TODO: add a date condition check if the CONCLUDED status is actually wrong
    const shortTermRentRentedDates = await ContractOrmEntity.query()
      .where('status', ContractStatus.CONCLUDED)
      .where('apartmentAdId', apartmentAdId);

    return {
      id,
      cost,
      currency,
      rentBookingType,
      arrivalTime: arrivalTime || null,
      departureTime: departureTime || null,
      apartmentAdId,
      updatedAt,
      createdAt,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      numberOfGuests,
      numberOfRooms,
      cancellationPolicy: cancellationPolicy || null,

      bookingAccessInMonths,
      lockedDates: shortTermRentLockedDates.map((i) => ({ startDate: i.startDate, endDate: i.endDate })),
      rentedDates: shortTermRentRentedDates
        .map((i) =>
          i.arrivalDate && i.departureDate
            ? { startDate: i.arrivalDate?.toISOString(), endDate: i.departureDate?.toISOString() }
            : null,
        )
        .filter((i) => i) as LockedDates[],

      // address location
      geoPoint: {
        lat,
        lon: lng,
      },

      // description field
      title: name,

      // media field
      photo: media?.photos[0].fileKey || '',

      remoteView: remoteView || null,
      selfCheckIn: selfCheckIn || null,
      freeParking: freeParking || null,
      workSpace: workSpace || null,
      quite: quite || null,
      forFamily: forFamily || null,

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

  protected async getPropsFromDomainEntity(entity: ApartmentAdEntity): Promise<ShortTermRentDocumentProps | undefined> {
    const apartmentAdProps = entity.getPropsCopy();

    const shortTermRentProps = apartmentAdProps.shortTermRent
      ? apartmentAdProps.shortTermRent.getPropsCopy()
      : undefined;

    if (!shortTermRentProps) {
      return;
    }

    const detailsProps = apartmentAdProps.details?.unpack();
    const details = {
      numberOfGuests: detailsProps?.numberOfGuests || 1,
      numberOfRooms: detailsProps?.numberOfRooms || null,
    };

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

    if (!rules) {
      rules = {
        allowedWithPets: null,
        allowedWithChildren: null,
        allowedToSmoke: null,
        allowedToHangingOut: null,
      };
    }

    let characteristics = apartmentAdProps.characteristics?.unpack();

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

    const arrivalAndDepartureTimeProps = shortTermRentProps.arrivalAndDepartureTime?.unpack();
    const arrivalAndDepartureTime =
      arrivalAndDepartureTimeProps?.arrivalTime && arrivalAndDepartureTimeProps.departureTime
        ? {
            arrivalTime: arrivalAndDepartureTimeProps.arrivalTime,
            departureTime: arrivalAndDepartureTimeProps.departureTime,
          }
        : {
            arrivalTime: null,
            departureTime: null,
          };

    const cancellationPolicy = shortTermRentProps.cancellationPolicy?.value || null;

    const id = shortTermRentProps.id.value;
    const apartmentAdId = entity.id.value;
    const cost = shortTermRentProps.costAndCurrency.cost;
    const currency = shortTermRentProps.costAndCurrency.currency;
    const rentBookingType = shortTermRentProps.rentBookingType.value;
    const rentPeriodType = apartmentAdProps.rentPeriodType.value;
    const apartmentType = apartmentAdProps.apartmentType.value;
    const apartmentCategory = apartmentAdProps.apartmentCategory.value;
    const photo = apartmentAdProps.media?.unpack().photos[0].fileKey || '';
    const { name, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily } = description;

    const lockedDates = shortTermRentProps.lockedDates.map((i) => {
      const { startDate, endDate } = i.values();
      return { startDate: startDate.value, endDate: endDate.value } as LockedDates;
    });

    // TODO: add a date condition check if the CONCLUDED status is actually wrong
    const shortTermRentRentedDates = await ContractOrmEntity.query()
      .where('status', ContractStatus.CONCLUDED)
      .where('apartmentAdId', apartmentAdId);

    const bookingAccessInMonths = shortTermRentProps.bookingAccessInMonths?.value || 0;
    const createdAt = shortTermRentProps.createdAt.value;
    const updatedAt = shortTermRentProps.updatedAt.value;

    return {
      id,
      apartmentAdId,
      rentBookingType,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      photo,
      cost,
      currency,
      cancellationPolicy,
      createdAt,
      updatedAt,
      geoPoint,
      bookingAccessInMonths,
      lockedDates,
      rentedDates: shortTermRentRentedDates
        .map((i) =>
          i.arrivalDate && i.departureDate
            ? { startDate: i.arrivalDate?.toISOString(), endDate: i.departureDate?.toISOString() }
            : null,
        )
        .filter((i) => i) as LockedDates[],
      title: name,
      remoteView: remoteView || null,
      selfCheckIn: selfCheckIn || null,
      freeParking: freeParking || null,
      workSpace: workSpace || null,
      quite: quite || null,
      forFamily: forFamily || null,
      ...details,
      ...rules,
      ...characteristics,
      ...arrivalAndDepartureTime,
    };
  }
}
