import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { CreateApartmentAdRequest } from 'src/rental-context/domains/apartment-ad/commands/create-apartment-ad/create-apartment-ad.request.dto';

import { ApartmentAdTermPeriodError } from '../../errors/apartment-ad-term-period.errors';
import { RentPeriodType } from '../../types';
import { ApartmentAdEntity } from '../apartment-ad.entity';

const apartmentAdFactory = ({ rentPeriodType, longTermRentCost, shortTermRentCost }: CreateApartmentAdRequest) => {
  return ApartmentAdEntity.create({
    landlordId: UUID.generate(),
    rentPeriodType,
    longTermRentCost,
    shortTermRentCost,
  });
};

describe('ApartmentAdEntity', () => {
  describe('edit', () => {
    it('should edit long term rent type to short term rent type', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.LONG_TERM, longTermRentCost: 500000 });

      expect(apartmentAd.isLongTermRent).toEqual(true);

      apartmentAd.editApartmentAd({ rentPeriodType: RentPeriodType.SHORT_TERM, shortTermRentCost: 40000 });

      expect(apartmentAd.isLongTermRent).toEqual(false);
      expect(apartmentAd.isShortTermRent).toEqual(true);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.SHORT_TERM);
    });

    it('should edit short term rent type to long term rent type', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.SHORT_TERM, shortTermRentCost: 500000 });

      expect(apartmentAd.isShortTermRent).toEqual(true);

      apartmentAd.editApartmentAd({ rentPeriodType: RentPeriodType.LONG_TERM, longTermRentCost: 40000 });

      expect(apartmentAd.isShortTermRent).toEqual(false);
      expect(apartmentAd.isLongTermRent).toEqual(true);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.LONG_TERM);
    });

    it('should edit short term rent type to all term rent types', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.SHORT_TERM, shortTermRentCost: 500000 });

      apartmentAd.editApartmentAd({
        rentPeriodType: RentPeriodType.ALL,
        longTermRentCost: 40000,
        shortTermRentCost: 200000,
      });

      expect(apartmentAd.isShortTermRent).toEqual(true);
      expect(apartmentAd.isLongTermRent).toEqual(true);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.ALL);
    });

    it('should edit long term rent type to all term rent types', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.LONG_TERM, longTermRentCost: 500000 });

      apartmentAd.editApartmentAd({
        rentPeriodType: RentPeriodType.ALL,
        longTermRentCost: 40000,
        shortTermRentCost: 200000,
      });

      expect(apartmentAd.isShortTermRent).toEqual(true);
      expect(apartmentAd.isLongTermRent).toEqual(true);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.ALL);
    });

    it('should edit all term rent type to short term rent type', () => {
      const apartmentAd = apartmentAdFactory({
        rentPeriodType: RentPeriodType.ALL,
        shortTermRentCost: 2000000,
        longTermRentCost: 500000,
      });

      apartmentAd.editApartmentAd({
        rentPeriodType: RentPeriodType.SHORT_TERM,
        shortTermRentCost: 200000,
      });

      expect(apartmentAd.isShortTermRent).toEqual(true);
      expect(apartmentAd.isLongTermRent).toEqual(false);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.SHORT_TERM);
    });

    it('should edit all term rent type to long term rent type', () => {
      const apartmentAd = apartmentAdFactory({
        rentPeriodType: RentPeriodType.ALL,
        shortTermRentCost: 2000000,
        longTermRentCost: 500000,
      });

      apartmentAd.editApartmentAd({
        rentPeriodType: RentPeriodType.LONG_TERM,
        longTermRentCost: 200000,
      });

      expect(apartmentAd.isShortTermRent).toEqual(false);
      expect(apartmentAd.isLongTermRent).toEqual(true);
      expect(apartmentAd.rentPeriodType.value).toEqual(RentPeriodType.LONG_TERM);
    });
  });

  describe('edit-errors', () => {
    it('should throw error by editing long term rent with short term cost argument', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.LONG_TERM, longTermRentCost: 500000 });

      const apartmentAdEditCallback = () =>
        apartmentAd.editApartmentAd({ rentPeriodType: RentPeriodType.LONG_TERM, shortTermRentCost: 6000000 });

      expect(apartmentAdEditCallback).toThrowError(ApartmentAdTermPeriodError);
    });

    it('should throw error by editing short term rent with long term cost argument', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.SHORT_TERM, shortTermRentCost: 500000 });

      const apartmentAdEditCallback = () =>
        apartmentAd.editApartmentAd({ rentPeriodType: RentPeriodType.SHORT_TERM, longTermRentCost: 6000000 });

      expect(apartmentAdEditCallback).toThrowError(ApartmentAdTermPeriodError);
    });

    it('should throw error by editing all term rent type without cost arguments', () => {
      const apartmentAd = apartmentAdFactory({
        rentPeriodType: RentPeriodType.ALL,
        shortTermRentCost: 500000,
        longTermRentCost: 6000000,
      });

      const apartmentAdEditCallback = () => apartmentAd.editApartmentAd({ rentPeriodType: RentPeriodType.ALL });

      expect(apartmentAdEditCallback).toThrowError(ArgumentInvalidException);
    });
  });
});
