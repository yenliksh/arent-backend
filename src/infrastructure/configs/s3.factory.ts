import { ConfigService } from '@nestjs/config';
import { S3ModuleOptions } from '@third-parties/cloud-files-storage/src';

export const s3Factory = {
  useFactory: (configService: ConfigService): S3ModuleOptions => {
    return {
      region: configService.get<string>('s3.region') as string,
      accessKeyId: configService.get<string>('aws.accessKey') as string,
      secretAccessKey: configService.get<string>('aws.secretAccessKey') as string,
      publicBucket: configService.get<string>('s3.publicBucket'),
      privateBucket: configService.get<string>('s3.privateBucket'),
      putActionExpiresSec: configService.get<number>('s3.putActionExpiresSec'),
      getActionExpiresSec: configService.get<number>('s3.getActionExpiresSec'),
    };
  },
  inject: [ConfigService],
};
