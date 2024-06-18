import { DateISOValidator } from '@infrastructure/validators';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsUUID, Validate } from 'class-validator';

@InputType()
export class CancelContractByTenantRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly contractId: string;

  @IsOptional()
  @Validate(DateISOValidator)
  @IsFutureDate()
  @Field(() => String, { nullable: true, description: 'new departure date' })
  readonly departureDate?: string;
}
