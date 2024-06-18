"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const s3_factory_1 = require("../../infrastructure/configs/s3.factory");
const sqs_factory_1 = require("../../infrastructure/configs/sqs.factory");
const elasticsearch_core_module_1 = require("../../infrastructure/elastic-search/elasticsearch-core.module");
const common_1 = require("@nestjs/common");
const src_1 = require("../../third-parties/cloud-files-storage/src");
const src_2 = require("../../third-parties/simple-queue/src");
const aws_controller_1 = require("./aws.controller");
const elasticsearch_synchronize_service_1 = require("./elastic-search/elasticsearch-synchronize.service");
const s3_service_1 = require("./s3/s3.service");
const sqs_service_1 = require("./sqs/sqs.service");
let AwsModule = class AwsModule {
};
AwsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            src_1.CloudFilesStorageModule.forRootAsync(s3_factory_1.s3Factory),
            src_2.SimpleQueueModule.forRootAsync(sqs_factory_1.sqsFactory),
            elasticsearch_core_module_1.ElasticsearchCoreModule,
        ],
        controllers: [aws_controller_1.AwsController],
        providers: [s3_service_1.S3Service, elasticsearch_synchronize_service_1.ElasticsearchSynchronizeService, sqs_service_1.SQSService],
        exports: [s3_service_1.S3Service, sqs_service_1.SQSService],
    })
], AwsModule);
exports.AwsModule = AwsModule;
//# sourceMappingURL=aws.module.js.map