import { FactoryProvider } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LongTermRentDocument } from './documents/long-term-rent.document';
import { ShortTermRentLockedDateDocument } from './documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from './documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocument } from './documents/short-term-rent.document';
import { LongTermRentDocumentRepository } from './repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from './repositories/short-term-rent.document-repository';
export declare const elasticsearchDocuments: (typeof ShortTermRentDocument | typeof ShortTermRentLockedDateDocument | typeof ShortTermRentRentedDateDocument | typeof LongTermRentDocument)[];
export declare const elasticsearchCoreProvider: FactoryProvider<ElasticsearchService>;
export declare const elasticsearchDocumentRepositories: ({
    provide: typeof LongTermRentDocumentRepository;
    useFactory: (client: ElasticsearchService) => LongTermRentDocumentRepository;
    inject: import("@nestjs/common").InjectionToken[];
} | {
    provide: typeof ShortTermRentDocumentRepository;
    useFactory: (client: ElasticsearchService) => ShortTermRentDocumentRepository;
    inject: import("@nestjs/common").InjectionToken[];
})[];
export declare class ElasticsearchCoreModule {
}
