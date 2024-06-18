"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const contract_orm_entity_1 = require("./contract.orm-entity");
const payment_invoice_orm_entity_1 = require("./payment-invoice.orm-entity");
class PaymentTransactionOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return PaymentTransactionOrmEntity.fromJson(data);
    }
}
exports.PaymentTransactionOrmEntity = PaymentTransactionOrmEntity;
PaymentTransactionOrmEntity.tableName = 'payment_transactions';
PaymentTransactionOrmEntity.relationMappings = () => {
    return {
        invoices: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity,
            join: {
                from: `${PaymentTransactionOrmEntity.tableName}.id`,
                to: `${payment_invoice_orm_entity_1.PaymentInvoiceOrmEntity.tableName}.paymentTransactionId`,
            },
        },
        contract: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${PaymentTransactionOrmEntity.tableName}.contractId`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=payment-transaction.orm-entity.js.map