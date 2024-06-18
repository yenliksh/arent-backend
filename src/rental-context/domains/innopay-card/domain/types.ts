import { registerEnumType } from '@nestjs/graphql';

export enum InnopayCardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
}

registerEnumType(InnopayCardType, {
  name: 'InnopayCardType',
});

export enum InnopayAppointmentCardType {
  CHARGE_OFF = 'CHARGE_OFF',
  CREDITING = 'CREDITING',
}

registerEnumType(InnopayAppointmentCardType, {
  name: 'InnopayAppointmentCardType',
});
