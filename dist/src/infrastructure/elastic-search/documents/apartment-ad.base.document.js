"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdBaseDocument = void 0;
const elasticsearch_document_base_1 = require("../base-classes/elasticsearch.document.base");
class ApartmentAdBaseDocument extends elasticsearch_document_base_1.ElasticsearchDocumentBase {
    get settings() {
        return {
            number_of_shards: 1,
            number_of_routing_shards: 3,
            max_ngram_diff: 49,
            analysis: {
                analyzer: {
                    text_middle_index: {
                        type: 'custom',
                        tokenizer: 'keyword',
                        filter: ['lowercase', 'asciifolding', 'ngram_filter'],
                    },
                },
                filter: {
                    ngram_filter: {
                        type: 'ngram',
                        min_gram: 1,
                        max_gram: 50,
                    },
                },
            },
        };
    }
    get mappingProperties() {
        return {
            properties: {
                id: {
                    type: 'keyword',
                },
                updatedAt: {
                    type: 'date',
                },
                createdAt: {
                    type: 'date',
                },
                rentPeriodType: {
                    type: 'keyword',
                },
                apartmentType: {
                    type: 'keyword',
                },
                apartmentCategory: {
                    type: 'keyword',
                },
                numberOfGuests: {
                    type: 'integer',
                },
                numberOfRooms: {
                    type: 'integer',
                },
                geoPoint: {
                    type: 'geo_point',
                },
                title: {
                    type: 'text',
                    index: false,
                },
                slug: {
                    type: 'text',
                    index: false,
                },
                name: {
                    type: 'text',
                    index: false,
                    store: false,
                },
                description: {
                    type: 'text',
                    index: false,
                    store: false,
                },
                photo: {
                    type: 'text',
                    index: false,
                },
                remoteView: {
                    type: 'boolean',
                },
                selfCheckIn: {
                    type: 'boolean',
                },
                freeParking: {
                    type: 'boolean',
                },
                workSpace: {
                    type: 'boolean',
                },
                quite: {
                    type: 'boolean',
                },
                forFamily: {
                    type: 'boolean',
                },
                allowedWithPets: {
                    type: 'boolean',
                },
                allowedWithChildren: {
                    type: 'boolean',
                },
                allowedToSmoke: {
                    type: 'boolean',
                },
                allowedToHangingOut: {
                    type: 'boolean',
                },
                totalArea: {
                    type: 'integer',
                },
                landArea: {
                    type: 'integer',
                },
                territoryArea: {
                    type: 'integer',
                },
                objectArea: {
                    type: 'integer',
                },
                ceilingHeight: {
                    type: 'integer',
                },
                yearOfConstruction: {
                    type: 'integer',
                },
                floor: {
                    type: 'integer',
                },
                waterSupply: {
                    type: 'keyword',
                },
                electricitySupply: {
                    type: 'keyword',
                },
                gasSupply: {
                    type: 'keyword',
                },
                objectPlacement: {
                    type: 'keyword',
                },
                light: {
                    type: 'boolean',
                },
                water: {
                    type: 'boolean',
                },
                gas: {
                    type: 'boolean',
                },
                sewerage: {
                    type: 'boolean',
                },
                heating: {
                    type: 'boolean',
                },
                ventilation: {
                    type: 'boolean',
                },
                ...this.propertiesScheme,
            },
        };
    }
}
exports.ApartmentAdBaseDocument = ApartmentAdBaseDocument;
//# sourceMappingURL=apartment-ad.base.document.js.map