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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const cloud_cache_storage_types_1 = require("../cloud-cache-storage.types");
let RedisService = class RedisService {
    constructor(options) {
        this.options = options;
        this._client = this.createClientFromOptions();
        this._clientForSubscriberMode = this.createClientFromOptions();
    }
    createClientFromOptions() {
        return new ioredis_1.default(this.options);
    }
    get client() {
        return this._client;
    }
    get clientForSubscriberMode() {
        return this._clientForSubscriberMode;
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cloud_cache_storage_types_1.CLOUD_CACHE_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [Object])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map