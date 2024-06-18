import { redisPubSubConfigFactory } from '@infrastructure/configs/redis-pub-sub-config.factory';
import { redisPubSubFactory } from '@infrastructure/configs/redis-pub-sub.factory';
import { Module } from '@nestjs/common';
import { CloudCacheStorageModule } from '@third-parties/cloud-cache-storage/src';

import { PubSubService } from './pub-sub.service';

@Module({
  imports: [CloudCacheStorageModule.forRootAsync(redisPubSubConfigFactory)],
  providers: [redisPubSubFactory, PubSubService],
  exports: [PubSubService],
})
export class GraphqlSubscriptionsModule {}
