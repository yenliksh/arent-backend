import { SQS_QUEUES_NAMES } from '@modules/aws/sqs/constants';
import { ConfigService } from '@nestjs/config';
import { SQSModuleOptions } from '@third-parties/simple-queue/src';

export const sqsFactory = {
  useFactory: (configService: ConfigService): SQSModuleOptions => {
    return {
      accessKeyId: configService.get<string>('sqs.accessKey') as string,
      secretAccessKey: configService.get<string>('sqs.secretAccessKey') as string,
      region: configService.get<string>('sqs.region') as string,
      queuesNames: SQS_QUEUES_NAMES,
      // endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:9324' : undefined,
    };
  },
  inject: [ConfigService],
};
