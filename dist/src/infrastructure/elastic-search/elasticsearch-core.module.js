"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchCoreModule = exports.elasticsearchDocumentRepositories = exports.elasticsearchCoreProvider = exports.elasticsearchDocuments = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const AWS = require("aws-sdk");
const long_term_rent_document_1 = require("./documents/long-term-rent.document");
const short_term_rent_locked_dates_document_1 = require("./documents/short-term-rent-locked-dates.document");
const short_term_rent_rented_dates_document_1 = require("./documents/short-term-rent-rented-dates.document");
const short_term_rent_document_1 = require("./documents/short-term-rent.document");
const long_term_rent_document_repository_1 = require("./repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("./repositories/short-term-rent.document-repository");
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');
exports.elasticsearchDocuments = [
    long_term_rent_document_1.LongTermRentDocument,
    short_term_rent_document_1.ShortTermRentDocument,
    short_term_rent_locked_dates_document_1.ShortTermRentLockedDateDocument,
    short_term_rent_rented_dates_document_1.ShortTermRentRentedDateDocument,
];
exports.elasticsearchCoreProvider = {
    provide: 'ElasticsearchCoreService',
    inject: [elasticsearch_1.ElasticsearchService],
    useFactory(elasticsearchService) {
        return elasticsearchService;
    },
};
exports.elasticsearchDocumentRepositories = [
    {
        provide: long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        useFactory: (client) => {
            return new long_term_rent_document_repository_1.LongTermRentDocumentRepository(client);
        },
        inject: [exports.elasticsearchCoreProvider.provide],
    },
    {
        provide: short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        useFactory: (client) => {
            return new short_term_rent_document_repository_1.ShortTermRentDocumentRepository(client);
        },
        inject: [exports.elasticsearchCoreProvider.provide],
    },
];
let ElasticsearchCoreModule = class ElasticsearchCoreModule {
};
ElasticsearchCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            elasticsearch_1.ElasticsearchModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory(configService) {
                    const awsConfig = new AWS.Config({
                        accessKeyId: configService.get('elasticsearch.accessKey'),
                        secretAccessKey: configService.get('elasticsearch.secretAccessKey'),
                        region: configService.get('elasticsearch.region'),
                    });
                    return {
                        ...createAwsElasticsearchConnector(awsConfig),
                        node: configService.get('elasticsearch.node'),
                    };
                },
            }),
        ],
        providers: [exports.elasticsearchCoreProvider, ...exports.elasticsearchDocuments, ...exports.elasticsearchDocumentRepositories],
        exports: [exports.elasticsearchCoreProvider.provide, ...exports.elasticsearchDocuments, ...exports.elasticsearchDocumentRepositories],
    })
], ElasticsearchCoreModule);
exports.ElasticsearchCoreModule = ElasticsearchCoreModule;
//# sourceMappingURL=elasticsearch-core.module.js.map