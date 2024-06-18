import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types';
import * as AWS from 'aws-sdk';

export const importSsutSqsModule = (options: SqsOptions) => {
  AWS.config.update({
    region: process.env.SQS_AWS_REGION_NAME,
    accessKeyId: process.env.SQS_AWS_ACCESS_KEY,
    secretAccessKey: process.env.SQS_AWS_SECRET_ACCESS_KEY,
  });

  return SqsModule.register(options);
};
