"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentDocument = void 0;
const apartment_ad_base_document_1 = require("./apartment-ad.base.document");
class LongTermRentDocument extends apartment_ad_base_document_1.ApartmentAdBaseDocument {
    constructor() {
        super(...arguments);
        this.indexName = 'long_term_rents';
        this.propertiesScheme = {
            cost: {
                type: 'long',
            },
            currency: {
                type: 'keyword',
            },
            apartmentAdId: {
                type: 'keyword',
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
}
exports.LongTermRentDocument = LongTermRentDocument;
//# sourceMappingURL=long-term-rent.document.js.map