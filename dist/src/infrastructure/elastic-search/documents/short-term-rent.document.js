"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentDocument = void 0;
const apartment_ad_base_document_1 = require("./apartment-ad.base.document");
class ShortTermRentDocument extends apartment_ad_base_document_1.ApartmentAdBaseDocument {
    constructor() {
        super(...arguments);
        this.indexName = 'short_term_rents';
        this.propertiesScheme = {
            currency: {
                type: 'keyword',
            },
            cost: {
                type: 'long',
            },
            apartmentAdId: {
                type: 'keyword',
            },
            rentBookingType: {
                type: 'keyword',
            },
            cancellationPolicy: {
                type: 'keyword',
            },
            arrivalTime: {
                type: 'date',
                format: 'hour_minute',
            },
            departureTime: {
                type: 'date',
                format: 'hour_minute',
            },
            lockedDates: {
                type: 'text',
                store: false,
                index: false,
            },
            rentedDates: {
                type: 'text',
                store: false,
                index: false,
            },
            bookingAccessInMonths: {
                type: 'integer',
                null_value: 0,
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
exports.ShortTermRentDocument = ShortTermRentDocument;
//# sourceMappingURL=short-term-rent.document.js.map