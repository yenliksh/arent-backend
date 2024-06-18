import { GenderType } from '@domains/user/domain/types';
import { DateISOValidator, PhoneValidator } from '@infrastructure/validators';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

class AdminProfileEditGuarantorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Validate(PhoneValidator)
  phone: string;
}

class AdminProfileEditNameDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly middleName?: string | null;
}

export class AdminProfileEditUserInfoDto {
  // @ValidateIf((obj) => obj.birthdate) maybe?
  @IsOptional()
  @IsString()
  @Validate(DateISOValidator)
  birthdate?: string;

  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @IsOptional()
  guarantor?: AdminProfileEditGuarantorDto;

  @IsOptional()
  userName?: AdminProfileEditNameDto;
}
