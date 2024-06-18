import { s3Factory } from '@infrastructure/configs/s3.factory';
import { sqsFactory } from '@infrastructure/configs/sqs.factory';
import { ElasticsearchCoreModule } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { Module } from '@nestjs/common';
import { CloudFilesStorageModule } from '@third-parties/cloud-files-storage/src';
import { SimpleQueueModule } from '@third-parties/simple-queue/src';

import { AwsController } from './aws.controller';
import { ElasticsearchSynchronizeService } from './elastic-search/elasticsearch-synchronize.service';
import { S3Service } from './s3/s3.service';
import { SQSService } from './sqs/sqs.service';

@Module({
  imports: [
    CloudFilesStorageModule.forRootAsync(s3Factory),
    SimpleQueueModule.forRootAsync(sqsFactory),
    ElasticsearchCoreModule,
  ],
  controllers: [AwsController],
  providers: [S3Service, ElasticsearchSynchronizeService, SQSService],
  exports: [S3Service, SQSService],
})
export class AwsModule {}
