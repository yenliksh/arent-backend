"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentRentedDateDocument = void 0;
const elasticsearch_document_base_1 = require("../base-classes/elasticsearch.document.base");
class ShortTermRentRentedDateDocument extends elasticsearch_document_base_1.ElasticsearchDocumentBase {
    constructor() {
        super(...arguments);
        this.indexName = 'short_term_rent_rented_dates';
        this.propertiesScheme = {
            id: {
                type: 'keyword',
            },
            slug: {
                type: 'keyword',
            },
            startDate: {
                type: 'date',
                format: 'strict_date_time',
            },
            endDate: {
                type: 'date',
                format: 'strict_date_time',
            },
            geoPoint: {
                type: 'geo_point',
            },
        };
    }
    getIndicesOptions() {
        return {
            index: this.indexName,
            include_type_name: false,
            body: {
                settings: this.settings,
                mappings: this.mappingProperties,
            },
        };
    }
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
            properties: this.propertiesScheme,
        };
    }
}
exports.ShortTermRentRentedDateDocument = ShortTermRentRentedDateDocument;
//# sourceMappingURL=short-term-rent-rented-dates.document.js.map