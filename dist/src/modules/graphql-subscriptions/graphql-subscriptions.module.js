"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlSubscriptionsModule = void 0;
const redis_pub_sub_config_factory_1 = require("../../infrastructure/configs/redis-pub-sub-config.factory");
const redis_pub_sub_factory_1 = require("../../infrastructure/configs/redis-pub-sub.factory");
const common_1 = require("@nestjs/common");
const src_1 = require("../../third-parties/cloud-cache-storage/src");
const pub_sub_service_1 = require("./pub-sub.service");
let GraphqlSubscriptionsModule = class GraphqlSubscriptionsModule {
};
GraphqlSubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [src_1.CloudCacheStorageModule.forRootAsync(redis_pub_sub_config_factory_1.redisPubSubConfigFactory)],
        providers: [redis_pub_sub_factory_1.redisPubSubFactory, pub_sub_service_1.PubSubService],
        exports: [pub_sub_service_1.PubSubService],
    })
], GraphqlSubscriptionsModule);
exports.GraphqlSubscriptionsModule = GraphqlSubscriptionsModule;
//# sourceMappingURL=graphql-subscriptions.module.js.map