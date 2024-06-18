import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RejectLongTermRentsRequestsDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  declineReason: string;
}
