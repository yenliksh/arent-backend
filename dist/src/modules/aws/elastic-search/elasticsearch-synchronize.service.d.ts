import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class ElasticsearchSynchronizeService implements OnModuleInit {
    private readonly longTermRentDocumentRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly configService;
    private logger;
    private runSeedsOnCreation;
    private repositoryList;
    constructor(longTermRentDocumentRepository: LongTermRentDocumentRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private createIndex;
}
