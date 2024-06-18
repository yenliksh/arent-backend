"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentDocumentRepository = void 0;
const short_term_rent_orm_entity_1 = require("../../database/entities/short-term-rent.orm-entity");
const types_1 = require("../../../rental-context/domains/apartment-ad/domain/types");
const elasticsearch_repository_base_1 = require("../base-classes/elasticsearch.repository.base");
const short_term_rent_locked_dates_document_1 = require("../documents/short-term-rent-locked-dates.document");
const short_term_rent_rented_dates_document_1 = require("../documents/short-term-rent-rented-dates.document");
const short_term_rent_document_1 = require("../documents/short-term-rent.document");
const short_term_rent_document_mapper_1 = require("../mappers/short-term-rent.document-mapper");
class ShortTermRentDocumentRepository extends elasticsearch_repository_base_1.ElasticsearchRepositoryBase {
    constructor(client) {
        super(client, new short_term_rent_document_mapper_1.ShortTermRentDocumentMapper(), new short_term_rent_document_1.ShortTermRentDocument());
        this.lockedDateDocument = new short_term_rent_locked_dates_document_1.ShortTermRentLockedDateDocument();
        this.rentedDateDocument = new short_term_rent_rented_dates_document_1.ShortTermRentRentedDateDocument();
    }
    async save(entity, slug) {
        const shortTermRentDocumentResp = await this.mapper.domainEntityToDocument(entity);
        if (shortTermRentDocumentResp.isErr()) {
            const errorMessage = 'The short-term rental period mapper cannot be complete successfully';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const shortTermRentDocument = shortTermRentDocumentResp.unwrap();
        const { lockedDates, rentedDates, ...doc } = shortTermRentDocument;
        const body = doc;
        const shortTermRentBody = [
            {
                index: {
                    _index: this.document.indexName,
                    _id: doc.id,
                },
            },
            {
                ...body,
                slug,
            },
        ];
        const lockedDatesBody = this.getLockedDatesBody(this.lockedDateDocument.indexName, lockedDates, shortTermRentDocument);
        const rentedDatesBody = this.getLockedDatesBody(this.rentedDateDocument.indexName, rentedDates, shortTermRentDocument);
        await this.client.bulk({ body: [...shortTermRentBody, ...lockedDatesBody, ...rentedDatesBody] });
        return entity.id.value;
    }
    getLockedDatesBody(indexName, lockedDates, shortTermRentDocument) {
        let shortTermRentLockedDatesBody;
        if (lockedDates) {
            shortTermRentLockedDatesBody = lockedDates.flatMap((lockedDate) => {
                const body = {
                    id: shortTermRentDocument.id,
                    startDate: lockedDate.startDate || null,
                    endDate: lockedDate.endDate || null,
                    geoPoint: shortTermRentDocument.geoPoint,
                };
                return [{ index: { _index: indexName } }, body];
            });
        }
        else {
            const body = {
                id: shortTermRentDocument.id,
                startDate: null,
                endDate: null,
                geoPoint: shortTermRentDocument.geoPoint,
            };
            shortTermRentLockedDatesBody = [{ index: { _index: indexName } }, body];
        }
        return shortTermRentLockedDatesBody;
    }
    async update(entity) {
        await this.delete(entity);
        await this.save(entity);
    }
    async delete(entity) {
        var _a;
        if (!entity.isShortTermRent || !((_a = entity.shortTermRentId) === null || _a === void 0 ? void 0 : _a.value)) {
            const errorMessage = 'Apartment ad does not have related Short term rent entity';
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
        const apartmentAdShortTermRentDocument = await this.mapper.domainEntityToDocument(entity);
        const body = apartmentAdShortTermRentDocument.unwrap();
        await this.client.deleteByQuery({
            index: [this.document.indexName, this.lockedDateDocument.indexName, this.rentedDateDocument.indexName],
            body: {
                query: {
                    match: {
                        id: body.id,
                    },
                },
            },
        });
        return entity.id.value;
    }
    async deleteById(shortTermRentId) {
        await this.client.deleteByQuery({
            index: [this.document.indexName, this.lockedDateDocument.indexName, this.rentedDateDocument.indexName],
            body: {
                query: {
                    match: {
                        id: shortTermRentId,
                    },
                },
            },
        });
        return shortTermRentId;
    }
    async seedIndex() {
        this.logger.warn(`Run seeding from DB for ${this.document.indexName}`);
        try {
            const ormEntities = await short_term_rent_orm_entity_1.ShortTermRentOrmEntity.query()
                .withGraphJoined({
                apartmentAd: true,
            })
                .where('status', '@>', [types_1.ApartmentAdStatusType.PUBLISHED]);
            const documents = await Promise.all(ormEntities.map((i) => this.mapper.ormEntityToDocument(i)));
            if (documents.some((i) => i.isErr())) {
                this.logger.error(`Unable to complete successfully seed operation for ${this.document.indexName}`);
                return false;
            }
            const bulkBody = documents
                .map((i) => i.unwrap())
                .flatMap((shortTermRentDocument) => {
                const { lockedDates, rentedDates, ...doc } = shortTermRentDocument;
                const body = doc;
                const shortTermRentBody = [
                    {
                        index: {
                            _index: this.document.indexName,
                            _id: doc.id,
                        },
                    },
                    body,
                ];
                const lockedDatesBody = this.getLockedDatesBody(this.lockedDateDocument.indexName, lockedDates, shortTermRentDocument);
                const rentedDatesBody = this.getLockedDatesBody(this.rentedDateDocument.indexName, rentedDates, shortTermRentDocument);
                return [...shortTermRentBody, ...lockedDatesBody, ...rentedDatesBody];
            });
            await this.client.bulk({ body: bulkBody });
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
            await this.client.indices.create(this.lockedDateDocument.getIndicesOptions());
            await this.client.indices.create(this.rentedDateDocument.getIndicesOptions());
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
        const lockedDateResult = await this.client.indices.exists({
            index: this.lockedDateDocument.indexName,
        });
        return result.body && lockedDateResult.body;
    }
}
exports.ShortTermRentDocumentRepository = ShortTermRentDocumentRepository;
//# sourceMappingURL=short-term-rent.document-repository.js.map