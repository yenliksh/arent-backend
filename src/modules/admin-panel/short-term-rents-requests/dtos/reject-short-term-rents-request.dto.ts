import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RejectShortTermRentsRequestsDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  declineReason: string;
}
