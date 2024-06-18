import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateApartmentAdComplaintRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentAdId' })
  readonly apartmentAdId: string;

  @IsDefined()
  @Field(() => [AdComplaintType], {
    description: 'complaintType',
  })
  readonly cause: AdComplaintType[];

  @IsOptional()
  @Field(() => String, { nullable: true, description: 'reason' })
  readonly reason?: string;
}
