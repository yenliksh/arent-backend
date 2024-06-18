"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCancelationEntity = void 0;
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const contract_errors_1 = require("../errors/contract.errors");
class ContractCancelationEntity extends entity_base_1.Entity {
    static create({ cancelationDate, checkOutDate, contractId, refundsAmountToSender, transferAmountToPlatform, transferAmountToRecipient, withdrawalAmountFromSender, withdrawalAmountFromRecipient, isFine, triggerUserId, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            cancelationDate,
            checkOutDate,
            contractId,
            refundsAmountToSender,
            transferAmountToPlatform,
            transferAmountToRecipient,
            withdrawalAmountFromSender,
            withdrawalAmountFromRecipient,
            isFine,
            triggerUserId,
        };
        const contractCancelation = new ContractCancelationEntity({ id, props });
        return contractCancelation;
    }
    validate() {
        const { contractId, isFine } = this.props;
        const fields = [contractId, isFine];
        if (fields.some((f) => f == null)) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Contract cancelation must to have complete all required fields');
        }
    }
}
exports.ContractCancelationEntity = ContractCancelationEntity;
//# sourceMappingURL=contract-cancelation.entity.js.map