import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApartmentCategory, ApartmentType } from 'src/rental-context/domains/apartment-ad/domain/types';

@InputType()
export class EditApartmentAdTypeRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @IsEnum(ApartmentCategory)
  @Field(() => ApartmentCategory)
  readonly apartmentCategory: ApartmentCategory;

  @IsOptional()
  @IsEnum(ApartmentType)
  @Field(() => ApartmentType, { nullable: true })
  readonly apartmentType?: ApartmentType | null;
}
