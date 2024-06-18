import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserIdentityRejectDto {
  @ApiProperty()
  @IsString()
  rejectReason: string;
}
