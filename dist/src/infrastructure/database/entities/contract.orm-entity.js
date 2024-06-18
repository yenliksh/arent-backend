"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_orm_entity_1 = require("./apartment-ad.orm-entity");
const contract_cancelation_orm_entity_1 = require("./contract-cancelation.orm-entity");
const contract_request_orm_entity_1 = require("./contract-request.orm-entity");
const innopay_card_orm_entity_1 = require("./innopay-card.orm-entity");
const payment_transaction_orm_entity_1 = require("./payment-transaction.orm-entity");
const rent_period_version_orm_entity_1 = require("./rent-period-version.orm-entity");
const user_orm_entity_1 = require("./user.orm-entity");
class ContractOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ContractOrmEntity.fromJson(data);
    }
}
exports.ContractOrmEntity = ContractOrmEntity;
ContractOrmEntity.tableName = 'contracts';
ContractOrmEntity.relationMappings = () => {
    return {
        transactions: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: payment_transaction_orm_entity_1.PaymentTransactionOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.id`,
                to: `${payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.tableName}.contractId`,
            },
        },
        contractRequest: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_request_orm_entity_1.ContractRequestOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.contractRequestId`,
                to: `${contract_request_orm_entity_1.ContractRequestOrmEntity.tableName}.id`,
            },
        },
        apartmentAd: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: apartment_ad_orm_entity_1.ApartmentAdOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.apartmentAdId`,
                to: `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`,
            },
        },
        rentPeriodVersion: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.rentPeriodVersionId`,
                to: `${rent_period_version_orm_entity_1.RentPeriodVersionOrmEntity.tableName}.id`,
            },
        },
        tenantInnopayCard: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: innopay_card_orm_entity_1.InnopayCardOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.tenantInnopayCardId`,
                to: `${innopay_card_orm_entity_1.InnopayCardOrmEntity.tableName}.id`,
            },
        },
        tenant: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.tenantId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
        contractCancelation: {
            relation: objection_1.Model.HasOneRelation,
            modelClass: contract_cancelation_orm_entity_1.ContractCancelationOrmEntity,
            join: {
                from: `${ContractOrmEntity.tableName}.id`,
                to: `${contract_cancelation_orm_entity_1.ContractCancelationOrmEntity.tableName}.contractId`,
            },
        },
    };
};
//# sourceMappingURL=contract.orm-entity.js.map