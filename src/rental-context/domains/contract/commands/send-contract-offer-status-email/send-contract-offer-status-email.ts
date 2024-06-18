import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsUUID } from 'class-validator';

@InputType()
export class SendOfferStatusEmail {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly recipientId: string;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly isLandLord?: boolean;
}
