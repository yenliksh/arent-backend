import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
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
  describe('create', () => {
    it('should create long term rent type', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.LONG_TERM, longTermRentCost: 500000 });

      expect(apartmentAd.isLongTermRent).toEqual(true);
    });

    it('should create short term rent type', () => {
      const apartmentAd = apartmentAdFactory({ rentPeriodType: RentPeriodType.SHORT_TERM, shortTermRentCost: 6000000 });

      expect(apartmentAd.isShortTermRent).toEqual(true);
    });

    it('should create all term rent type', () => {
      const apartmentAd = apartmentAdFactory({
        rentPeriodType: RentPeriodType.ALL,
        shortTermRentCost: 6000000,
        longTermRentCost: 500000,
      });

      expect(apartmentAd.isShortTermRent && apartmentAd.isLongTermRent).toEqual(true);
    });
  });

  describe('create-errors', () => {
    it('should throw error by creating long term rent with short term cost argument', () => {
      const apartmentAdCallback = () =>
        apartmentAdFactory({
          rentPeriodType: RentPeriodType.LONG_TERM,
          shortTermRentCost: 6000000,
        });

      expect(apartmentAdCallback).toThrowError(ApartmentAdTermPeriodError);
    });

    it('should throw error by creating short term rent with long term cost argument', () => {
      const apartmentAdCallback = () =>
        apartmentAdFactory({
          rentPeriodType: RentPeriodType.SHORT_TERM,
          longTermRentCost: 500000,
        });

      expect(apartmentAdCallback).toThrowError(ApartmentAdTermPeriodError);
    });

    it('should throw error by creating all term rent type without cost arguments', () => {
      const apartmentAdCallback = () =>
        apartmentAdFactory({
          rentPeriodType: RentPeriodType.ALL,
        });

      expect(apartmentAdCallback).toThrowError(ApartmentAdTermPeriodError);
    });
  });
});
