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
exports.ElasticsearchSynchronizeService = void 0;
const long_term_rent_document_repository_1 = require("../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ElasticsearchSynchronizeService = class ElasticsearchSynchronizeService {
    constructor(longTermRentDocumentRepository, shortTermRentDocumentRepository, configService) {
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.configService = configService;
        this.repositoryList = [];
        this.logger = new common_1.Logger('ElasticsearchSynchronizeService');
        this.repositoryList = [this.longTermRentDocumentRepository, this.shortTermRentDocumentRepository];
        this.runSeedsOnCreation = this.configService.get('elasticsearch.enableSeedFromDb');
    }
    async onModuleInit() {
        for await (const repository of this.repositoryList) {
            const isIndexAlreadyExists = await repository.isExistIndex();
            if (!isIndexAlreadyExists) {
                this.logger.warn(`Not found index for ${repository.document.indexName}, creating...`);
                await this.createIndex(repository);
            }
        }
    }
    async createIndex(repository) {
        try {
            await repository.createIndex();
            if (this.runSeedsOnCreation) {
                await repository.seedIndex();
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
ElasticsearchSynchronizeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        config_1.ConfigService])
], ElasticsearchSynchronizeService);
exports.ElasticsearchSynchronizeService = ElasticsearchSynchronizeService;
//# sourceMappingURL=elasticsearch-synchronize.service.js.map