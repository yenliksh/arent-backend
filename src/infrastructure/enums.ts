import { registerEnumType } from '@nestjs/graphql';

export enum FileCategory {
  AVATARS = 'AVATARS',
  APARTMENT_AD_MEDIA = 'APARTMENT_AD_MEDIA',
  APARTMENT_AD_DOCUMENTS = 'APARTMENT_AD_DOCUMENTS',
  IDENTITY_DOCUMENTS = 'IDENTITY_DOCUMENTS',
  CHAT_MEDIA = 'CHAT_MEDIA',
}

registerEnumType(FileCategory, {
  name: 'FileCategory',
});

export enum ApartmentRentPeriodType {
  LONG_TERM = 'LONG_TERM',
  SHORT_TERM = 'SHORT_TERM',
}

registerEnumType(ApartmentRentPeriodType, {
  name: 'ApartmentRentPeriodType',
});

export enum ContractStatus {
  REJECTED = 'REJECTED',
  CREATED = 'CREATED',
  OFFERING = 'OFFERING',
  CONCLUDED = 'CONCLUDED',
  COMPLETED = 'COMPLETED',
}

registerEnumType(ContractStatus, {
  name: 'ContractStatus',
});

export enum ShortTermRentCancellationPolicyType {
  FLEXIBLE = 'FLEXIBLE',
  MODERATE = 'MODERATE',
  INFLEXIBLE = 'INFLEXIBLE',
  STRICT = 'STRICT',
}

registerEnumType(ShortTermRentCancellationPolicyType, {
  name: 'ShortTermRentCancellationPolicyType',
});

export enum LongTermRentCancellationPolicyType {
  FORFEIT = 'FORFEIT',
}

registerEnumType(LongTermRentCancellationPolicyType, {
  name: 'LongTermRentCancellationPolicyType',
});

export enum MiddleTermRentCancellationPolicyType {
  DEFAULT = 'DEFAULT',
}

registerEnumType(MiddleTermRentCancellationPolicyType, {
  name: 'MiddleTermRentCancellationPolicyType',
});

// used only as input data from client
export enum ContractRentStatus {
  CONCLUDED = 'CONCLUDED',
  COMPLETED = 'COMPLETED',
}

registerEnumType(ContractRentStatus, {
  name: 'ContractRentStatus',
});

export enum PaymentMethod {
  INNOPAY = 'INNOPAY',
}

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});

export enum ShortTermRentBookingType {
  REQUEST = 'REQUEST',
  INSTANT = 'INSTANT',
}

registerEnumType(ShortTermRentBookingType, {
  name: 'ShortTermRentBookingType',
});

export enum ShortTermRentPaymentType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

registerEnumType(ShortTermRentPaymentType, {
  name: 'ShortTermRentPaymentType',
});

export enum WaterSupplyEnum {
  CENTRALWATERSUPPLY = 'centralWaterSupply',
  POSSIBLETOCONNECT = 'possibleToConnect',
  WELL = 'well',
  NOT = 'not',
}

export enum ElectricitySupplyEnum {
  YES = 'yes',
  POSSIBLETOCONNECT = 'possibleToConnect',
  NOT = 'not',
}

export enum GasSupplyEnum {
  TRUNKAUTONOMOUS = 'trunkAutonomous',
  POSSIBLETOCONNECT = 'possibleToConnect',
  NOT = 'not',
}

export enum ObjectPlacementEnum {
  BUSINESSCENTER = 'businessCenter',
  RESIDENTIONALCOMPLEX = 'residentionalComplex',
  MALL = 'mall',
  UNIVERSALMARKET = 'universalMarket',
  DETACHEDBUILDING = 'detachedBuilding',
}

export enum CommunicationsEnum {
  LIGHT = 'light',
  WATER = 'water',
  GAS = 'gas',
  SEWERAGE = 'sewerage',
  HEATING = 'heating',
  VENTILATION = 'ventilation',
}
