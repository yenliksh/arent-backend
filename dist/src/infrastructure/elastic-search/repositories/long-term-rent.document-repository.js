"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentDocumentRepository = void 0;
const long_term_rent_orm_entity_1 = require("../../database/entities/long-term-rent.orm-entity");
const types_1 = require("../../../rental-context/domains/apartment-ad/domain/types");
const elasticsearch_repository_base_1 = require("../base-classes/elasticsearch.repository.base");
const long_term_rent_document_1 = require("../documents/long-term-rent.document");
const long_term_rent_document_mapper_1 = require("../mappers/long-term-rent.document-mapper");
class LongTermRentDocumentRepository extends elasticsearch_repository_base_1.ElasticsearchRepositoryBase {
    constructor(client) {
        super(client, new long_term_rent_document_mapper_1.LongTermRentDocumentMapper(), new long_term_rent_document_1.LongTermRentDocument());
    }
    async save(entity, slug) {
        const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
        if (apartmentAdShortTermRentDocument.isErr()) {
            const errorMessage = 'The long-term rental period mapper cannot be complete successfully';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const body = apartmentAdShortTermRentDocument.unwrap();
        await this.client.index({
            index: this.document.indexName,
            id: body.id,
            body: {
                ...body,
                slug,
            },
        });
        return 'apartmentAdShortTermRentDocument.unwrap();';
    }
    async update(entity) {
        await this.delete(entity);
        await this.save(entity);
    }
    async delete(entity) {
        var _a;
        if (!entity.isLongTermRent || !((_a = entity.longTermRentId) === null || _a === void 0 ? void 0 : _a.value)) {
            const errorMessage = 'Apartment ad does not have related long term rent entity';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
        const body = apartmentAdShortTermRentDocument.unwrap();
        await this.client.delete({
            index: body.id,
            id: entity.id.value,
        });
        return entity.id.value;
    }
    async update2(entity, apartmentSeo) {
        var _a;
        if (!entity.isLongTermRent || !((_a = entity.longTermRentId) === null || _a === void 0 ? void 0 : _a.value)) {
            const errorMessage = 'Apartment ad does not have related long term rent entity';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
        const apartmentSeoProps = apartmentSeo === null || apartmentSeo === void 0 ? void 0 : apartmentSeo.getPropsCopy();
        if (apartmentAdShortTermRentDocument.isErr()) {
            const errorMessage = 'The long-term rental period mapper cannot be complete successfully';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const body = apartmentAdShortTermRentDocument.unwrap();
        await this.client.updateByQuery({
            index: [this.document.indexName],
            body: {
                query: {
                    match: {
                        id: body.id,
                    },
                    set: {
                        field: 'slug',
                        value: `${apartmentSeoProps === null || apartmentSeoProps === void 0 ? void 0 : apartmentSeoProps.adSearchId}-${apartmentSeoProps === null || apartmentSeoProps === void 0 ? void 0 : apartmentSeoProps.titleSeo}`,
                    },
                },
            },
        });
        return entity.id.value;
    }
    async deleteById(longTermRentId) {
        await this.client.delete({
            index: this.document.indexName,
            id: longTermRentId,
        });
        return longTermRentId;
    }
    async seedIndex() {
        this.logger.warn(`Run seeding from DB for ${this.document.indexName}`);
        try {
            const ormEntities = await long_term_rent_orm_entity_1.LongTermRentOrmEntity.query()
                .withGraphJoined({
                apartmentAd: true,
            })
                .where('status', '@>', [types_1.ApartmentAdStatusType.PUBLISHED]);
            const documents = await Promise.all(ormEntities.map((i) => this.mapper.ormEntityToDocument(i)));
            if (documents.some((i) => i.isErr())) {
                this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
                return false;
            }
            const body = documents
                .map((i) => i.unwrap())
                .flatMap((doc) => [{ index: { _index: this.document.indexName, _id: doc.id } }, doc]);
            await this.client.bulk({ body });
            return true;
        }
        catch (error) {
            this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
            return false;
        }
    }
    async createIndex() {
        this.logger.warn(`Run index create for ${this.document.indexName}`);
        try {
            await this.client.indices.create(this.document.getIndicesOptions());
            return true;
        }
        catch (error) {
            this.logger.error(`Unable to create index successfully for ${this.document.indexName}`);
            return false;
        }
    }
    async isExistIndex() {
        const result = await this.client.indices.exists({
            index: this.document.indexName,
        });
        return result.body;
    }
}
exports.LongTermRentDocumentRepository = LongTermRentDocumentRepository;
//# sourceMappingURL=long-term-rent.document-repository.js.map