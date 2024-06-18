import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyType {
  USD = 'USD',
  KZT = 'KZT',
  RUB = 'RUB',
}

registerEnumType(CurrencyType, {
  name: 'Currency',
});

export enum RentPeriodType {
  LONG_TERM = 'LONG_TERM',
  SHORT_TERM = 'SHORT_TERM',
  ALL = 'ALL',
}

registerEnumType(RentPeriodType, {
  name: 'RentPeriodType',
});

export enum ApartmentRuleType {
  ALLOWED_WITH_CHILDREN = 'ALLOWED_WITH_CHILDREN',
  ALLOWED_WITH_PETS = 'ALLOWED_WITH_PETS',
  ALLOWED_TO_SMOKE = 'ALLOWED_TO_SMOKE',
  ALLOWED_TO_HANGING_OUT = 'ALLOWED_TO_HANGING_OUT',
}

registerEnumType(ApartmentRuleType, {
  name: 'ApartmentRuleType',
});

export enum ApartmentType {
  FLAT = 'FLAT',
  ROOM = 'ROOM',
  COTTAGE = 'COTTAGE',
  HOSTEL = 'HOSTEL',
  MINI_HOTEL = 'MINI_HOTEL',
  GUESTHOUSE = 'GUESTHOUSE',
  APARTHOTEL = 'APARTHOTEL',
  IHC = 'IHC',
  PC = 'PC',
  LGX = 'LGX',
  LANDFORGARDEN = 'LANDFORGARDEN',
  COMMERCIAL = 'COMMERCIAL',
  COUNTRYCONSTRUCTION = 'COUNTRYCONSTRUCTION',
  OTHER = 'OTHER',
  FREEAPPOINTMENT = 'FREEAPPOINTMENT',
  OFFICE = 'OFFICE',
  STORAGE = 'STORAGE',
  PUBLICCATERING = 'PUBLICCATERING',
  SHOP = 'SHOP',
  BEAUTYSALOON = 'BEAUTYSALOON',
  CARSERVICE = 'CARSERVICE',
  INDUSTRIALBASE = 'INDUSTRIALBASE',
  FACTORY = 'FACTORY',
}

export enum ApartmentCategory {
  FLAT = 'FLAT',
  HOUSE = 'HOUSE',
  COUNTRYHOUSE = 'COUNTRYHOUSE',
  AREA = 'AREA',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  FOREIGN = 'FOREIGN',
  OTHERREALESTATE = 'OTHERREALESTATE',
}

registerEnumType(ApartmentType, {
  name: 'ApartmentType',
});

registerEnumType(ApartmentCategory, {
  name: 'ApartmentCategory',
});

export enum StageCreatingType {
  FORMAT_AND_COST_OF_RENT = 'FORMAT_AND_COST_OF_RENT',
  SELECT_TYPE_OF_APARTMENT = 'SELECT_TYPE_OF_APARTMENT',
  MORE_ABOUT_APARTMENT = 'MORE_ABOUT_APARTMENT',
  ADDRESS = 'ADDRESS',
  PHOTOS = 'PHOTOS',
  DESCRIPTION_OF_APARTMENT = 'DESCRIPTION_OD_APARTMENT',
  VITAL_INFORMATION = 'VITAL_INFORMATION',
}

registerEnumType(StageCreatingType, {
  name: 'StageCreatingType',
});

export enum ApartmentAdStatusType {
  ACTIVE = 'ACTIVE',
  PUBLISHED = 'PUBLISHED',
  PROCESSING = 'PROCESSING',
  PAUSED = 'PAUSED',
  DRAFT = 'DRAFT',
}

registerEnumType(ApartmentAdStatusType, {
  name: 'ApartmentAdStatusType',
});

export enum LegalCapacityType {
  INDIVIDUAL = 'INDIVIDUAL',
  LEGAL_ENTITY = 'LEGAL_ENTITY',
}

registerEnumType(LegalCapacityType, {
  name: 'LegalCapacityType',
});

export type AdEditActions = 'CREATE' | 'REMOVE' | 'UPDATE';
