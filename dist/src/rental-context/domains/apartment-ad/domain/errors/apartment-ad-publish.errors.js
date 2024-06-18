"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdPublishError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdPublishError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdPublishError.message, metadata);
        this.code = 'APARTMENT_AD.PUBLISH_ERROR';
    }
}
exports.ApartmentAdPublishError = ApartmentAdPublishError;
ApartmentAdPublishError.message = 'Apartment ad status cannot be published';
//# sourceMappingURL=apartment-ad-publish.errors.js.map