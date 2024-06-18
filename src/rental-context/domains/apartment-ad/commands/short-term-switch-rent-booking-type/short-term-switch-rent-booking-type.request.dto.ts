import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class ShortTermSwitchRentBookingTypeRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;
}
