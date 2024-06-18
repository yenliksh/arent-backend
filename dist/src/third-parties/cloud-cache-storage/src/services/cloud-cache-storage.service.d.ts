import { RedisService } from './redis.service';
export declare class CloudCacheStorageService {
    private readonly redisService;
    constructor(redisService: RedisService);
    setValue(key: string, value: Record<string, any>): void;
    setValueWithExp(key: string, value: Record<string, any>, expireInSec?: number): {
        key: string;
        value: Record<string, any>;
        expDate: string;
    };
    getValue<T>(key: string): Promise<null | T>;
    deleteValue(key: string): Promise<boolean>;
}
