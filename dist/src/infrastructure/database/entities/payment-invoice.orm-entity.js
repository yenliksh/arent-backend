"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoiceOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const payment_transaction_orm_entity_1 = require("./payment-transaction.orm-entity");
class PaymentInvoiceOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return PaymentInvoiceOrmEntity.fromJson(data);
    }
}
exports.PaymentInvoiceOrmEntity = PaymentInvoiceOrmEntity;
PaymentInvoiceOrmEntity.tableName = 'payment_invoices';
PaymentInvoiceOrmEntity.relationMappings = () => {
    return {
        transaction: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: payment_transaction_orm_entity_1.PaymentTransactionOrmEntity,
            join: {
                from: `${PaymentInvoiceOrmEntity.tableName}.paymentTransactionId`,
                to: `${payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=payment-invoice.orm-entity.js.map