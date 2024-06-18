import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsEnum, IsOptional } from 'class-validator';

export class AdminCancelationModeRequest implements AdminCancelationMode {
  @ApiProperty({ description: 'If need force cancellation (for long-term only)', type: Boolean })
  @IsDefined()
  @IsBoolean()
  readonly force: boolean;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  readonly validExcuse: boolean;
}

export class ContractCancellationRequest {
  @ApiProperty({ type: AdminCancelationModeRequest })
  @IsOptional()
  readonly cancellationMeta?: AdminCancelationModeRequest;

  @ApiProperty({ description: 'User role who request cancellation', enum: CancellationTrigger })
  @IsDefined()
  @IsEnum(CancellationTrigger)
  readonly requestingUserRole: CancellationTrigger;
}
