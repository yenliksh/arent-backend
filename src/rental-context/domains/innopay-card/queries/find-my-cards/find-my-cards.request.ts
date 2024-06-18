import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

@InputType()
export class FindMyCardsRequest {
  @IsOptional()
  @IsEnum(InnopayAppointmentCardType)
  @Field(() => InnopayAppointmentCardType, { description: 'choose card type' })
  readonly type: InnopayAppointmentCardType;
}
