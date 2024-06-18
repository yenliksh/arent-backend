import * as IoRedis from 'ioredis';
import { CloudCacheModuleOptions } from '../cloud-cache-storage.types';
export declare class RedisService {
    private readonly options;
    private _client;
    private _clientForSubscriberMode;
    constructor(options: CloudCacheModuleOptions);
    private createClientFromOptions;
    get client(): IoRedis.Redis;
    get clientForSubscriberMode(): IoRedis.Redis;
}
