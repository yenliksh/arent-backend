"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardEntity = void 0;
const enums_1 = require("../../../../../infrastructure/enums");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const innopay_card_errors_1 = require("../errors/innopay-card.errors");
class InnopayCardEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ cnpCardId, panMasked, cardHolder, cardType, cnpUserId, userId, appointmentType, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            userId,
            cnpCardId,
            panMasked,
            cardHolder,
            cardType,
            cnpUserId,
            appointmentType,
        };
        const card = new InnopayCardEntity({ id, props });
        return card;
    }
    get id() {
        return this._id;
    }
    get cnpCardId() {
        return this.props.cnpCardId;
    }
    get cnpUserId() {
        return this.props.cnpUserId;
    }
    get userId() {
        return this.props.userId;
    }
    get cardMeta() {
        return {
            id: this._id.value,
            paymentMethod: enums_1.PaymentMethod.INNOPAY,
            cardType: this.props.cardType,
            panMasked: this.props.panMasked.value,
            cardHolder: this.props.cardHolder,
        };
    }
    validate() {
        const { userId, cnpCardId, panMasked, cardHolder, cardType, cnpUserId } = this.props;
        const fields = [userId, cnpCardId, panMasked, cardHolder, cardType, cnpUserId];
        if (fields.some((f) => f == null)) {
            throw new innopay_card_errors_1.InnopayCardHasEmptyFieldsError('Innopay card to complete all required fields');
        }
        if (!guard_1.Guard.isPositiveNumber(cnpUserId)) {
            throw new exceptions_1.ArgumentInvalidException('cnpUserId must be more that 0');
        }
    }
}
exports.InnopayCardEntity = InnopayCardEntity;
//# sourceMappingURL=innopay-card.entity.js.map