"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCacheStorageService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const redis_service_1 = require("./redis.service");
let CloudCacheStorageService = class CloudCacheStorageService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    setValue(key, value) {
        this.redisService.client.set(key, JSON.stringify(value));
    }
    setValueWithExp(key, value, expireInSec = 60) {
        const expDate = moment().add(expireInSec, 'seconds');
        const expDateISO = expDate.toISOString();
        this.redisService.client.set(key, JSON.stringify({ ...value, expDate: expDateISO }), 'EX', expireInSec);
        return {
            key,
            value,
            expDate: expDateISO,
        };
    }
    async getValue(key) {
        const value = await this.redisService.client.get(key);
        if (value) {
            return JSON.parse(value);
        }
        else {
            return null;
        }
    }
    async deleteValue(key) {
        const res = await this.redisService.client.del(key);
        return Boolean(res);
    }
};
CloudCacheStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], CloudCacheStorageService);
exports.CloudCacheStorageService = CloudCacheStorageService;
//# sourceMappingURL=cloud-cache-storage.service.js.map