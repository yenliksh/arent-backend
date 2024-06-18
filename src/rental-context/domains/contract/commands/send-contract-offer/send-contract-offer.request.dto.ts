import { DateISOValidator } from '@infrastructure/validators';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsUUID, Validate, ValidateIf } from 'class-validator';

@InputType()
export class SendContractOfferRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly chatId: string;

  @ValidateIf((obj) => obj.arrivalDate)
  @IsDefined()
  @IsFutureDate()
  @Validate(DateISOValidator)
  @Field(() => String, { nullable: true, description: 'only for short term rent period' })
  readonly arrivalDate?: string;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedWithPets: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedWithChildren: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedToSmoke: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedToHangingOut: boolean;
}
