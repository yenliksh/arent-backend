import { LoginValidator } from '@infrastructure/validators';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length, Validate } from 'class-validator';

export class AdminsSignInBodyDto {
  @ApiProperty({ example: 'admin.livin', description: 'Admin login', type: String })
  @Validate(LoginValidator)
  @Transform(({ value }) => value.toLowerCase())
  login: string;

  @ApiProperty({ example: 'admin', description: 'Admin password', type: String })
  @IsString()
  @Length(0, 254)
  password: string;
}
