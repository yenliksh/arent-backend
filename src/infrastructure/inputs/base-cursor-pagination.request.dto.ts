import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { IsValidRequestCursor } from '../validators/cursor.validator';

@InputType()
export class BaseAfterCursorPaginateRequest {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsValidRequestCursor()
  afterCursor?: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  limit?: number;
}

@InputType()
export class BaseBeforeCursorPaginateRequest {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsValidRequestCursor()
  beforeCursor?: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  limit?: number;
}
