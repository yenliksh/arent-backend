import { FileCategory } from '@infrastructure/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class GetSignedUrlDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({ enum: FileCategory })
  @IsNotEmpty()
  @IsEnum(FileCategory)
  fileCategory: FileCategory;

  @ApiProperty({ required: false })
  @ValidateIf(
    (obj) =>
      obj.fileCategory === FileCategory.APARTMENT_AD_MEDIA || obj.fileCategory === FileCategory.APARTMENT_AD_DOCUMENTS,
  )
  @IsNotEmpty()
  @IsUUID('4')
  apartmentAdId?: string;

  @ApiProperty({ required: false })
  @ValidateIf((obj) => obj.fileCategory === FileCategory.CHAT_MEDIA)
  @IsNotEmpty()
  @IsUUID('4')
  chatId?: string;
}

export class DeleteFromS3Dto {
  @ApiProperty({ enum: FileCategory })
  @IsNotEmpty()
  @IsEnum(FileCategory)
  fileCategory: FileCategory;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fileKey: string;
}
