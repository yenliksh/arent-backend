"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentEntity = void 0;
const cost_and_currency_value_object_1 = require("../../../../domain-value-objects/cost-and-currency.value-object");
const documents_value_object_1 = require("../../../../domain-value-objects/documents.value-object");
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const illegal_operation_exception_1 = require("../../../../../libs/exceptions/illegal-operation.exception");
const apartment_ad_constrain_errors_1 = require("../errors/apartment-ad-constrain.errors");
const apartment_ad_pause_error_1 = require("../errors/apartment-ad-pause.error");
const apartment_ad_publish_errors_1 = require("../errors/apartment-ad-publish.errors");
const apartment_ad_errors_1 = require("../errors/apartment-ad.errors");
const types_1 = require("../types");
const apartment_ad_status_value_object_1 = require("../value-objects/apartment-ad-status.value-object");
class LongTermRentEntity extends entity_base_1.Entity {
    static create({ apartmentAdId, cost }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            apartmentAdId,
            isApproved: false,
            costAndCurrency: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost,
            }),
            status: apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({ statusType: [types_1.ApartmentAdStatusType.DRAFT] }),
        };
        const longTermRent = new LongTermRentEntity({ id, props });
        return longTermRent;
    }
    get id() {
        return this._id;
    }
    get apartmentAdId() {
        return this.props.apartmentAdId;
    }
    get costAndCurrency() {
        return this.props.costAndCurrency;
    }
    get cancellationPolicy() {
        var _a;
        return (_a = this.props.cancellationPolicy) === null || _a === void 0 ? void 0 : _a.value;
    }
    get status() {
        return this.props.status;
    }
    get isApproved() {
        return this.props.isApproved;
    }
    setCost(cost) {
        this.props.costAndCurrency = cost_and_currency_value_object_1.CostAndCurrencyVO.create({
            cost,
        });
    }
    sendToApprove() {
        if (this.props.isApproved) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [...new Set([...this.props.status.statusType])],
                declineReason: null,
            });
            return this;
        }
        if (this.props.status.isDraft) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PROCESSING],
                declineReason: null,
            });
            return this;
        }
    }
    pause() {
        if (this.props.isApproved && this.props.status.isPublished) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PAUSED],
                declineReason: this.props.status.declineReason,
            });
            return this;
        }
        throw new apartment_ad_pause_error_1.ApartmentAdPauseError();
    }
    publish() {
        if (this.props.isApproved && this.props.status.isPaused) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PUBLISHED],
                declineReason: this.props.status.declineReason,
            });
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    get hasOwnershipDocuments() {
        var _a;
        return !!((_a = this.props.ownershipDocuments) === null || _a === void 0 ? void 0 : _a.fileKeys);
    }
    approve() {
        if (!this.hasOwnershipDocuments) {
            throw new illegal_operation_exception_1.IllegalOperationException('User can not have published ads without ownership documents');
        }
        if (this.props.isApproved && this.props.status.isProcessing) {
        }
        if (this.props.status.isProcessing) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.PUBLISHED],
            });
            this.props.isApproved = true;
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    reject(declineReason) {
        if (this.props.status.isProcessing) {
            this.props.status = apartment_ad_status_value_object_1.ApartmentAdStatusVO.create({
                statusType: [types_1.ApartmentAdStatusType.DRAFT],
                declineReason,
            });
            return this;
        }
        throw new apartment_ad_publish_errors_1.ApartmentAdPublishError();
    }
    get isPublishable() {
        const { apartmentAdId, costAndCurrency, isApproved, status } = this.props;
        const fields = [apartmentAdId, costAndCurrency, isApproved, status];
        if (fields.some((f) => f == null)) {
            return false;
        }
        return true;
    }
    setOwnershipDocuments(documents) {
        if (this.props.isApproved) {
            throw new apartment_ad_constrain_errors_1.ApartmentAdConstrainError('Change ownership documents cannot be applied for approved ad');
        }
        this.props.ownershipDocuments = new documents_value_object_1.DocumentsVO({ fileKeys: documents });
    }
    validate() {
        const { apartmentAdId, costAndCurrency: { cost, currency }, } = this.props;
        const fields = [apartmentAdId, cost, currency];
        if (fields.some((f) => f == null)) {
            throw new apartment_ad_errors_1.ApartmentAdHasEmptyFieldsError('Long term rent must to have complete all required fields');
        }
    }
}
exports.LongTermRentEntity = LongTermRentEntity;
//# sourceMappingURL=long-term-rent.entity.js.map