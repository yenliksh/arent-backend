"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortTermRentLandlordCancelationStrategyFactory = exports.shortTermRentTenantCancelationStrategyFactory = void 0;
const contract_rental_strategy_factory_1 = require("../../../../rental-strategies/__tests__/factories/contract-rental-strategy.factory");
const enums_1 = require("../../../../../../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const short_term_rent_landlord_cancelation_strategy_1 = require("../../short-term-rent-landlord-cancelation.strategy");
const short_term_rent_tenant_cancelation_strategy_1 = require("../../short-term-rent-tenant-cancelation.strategy");
const shortTermRentTenantCancelationStrategyFactory = ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }) => {
    const contract = (0, contract_rental_strategy_factory_1.contractRentalStrategyFactory)(contractCreateProps);
    contract.setOffer({
        allowedToHangingOut: true,
        allowedToSmoke: true,
        allowedWithChildren: true,
        allowedWithPets: true,
    });
    const transactions = contract.acceptOffer(uuid_value_object_1.UUID.generate());
    const cardMeta = {
        id: '0a991c03-1666-4dc3-b50a-7f1b699915f6',
        paymentMethod: enums_1.PaymentMethod.INNOPAY,
        cardType: 'VISA',
        panMasked: '1234',
        cardHolder: 'Roy Johnson',
    };
    if (cashOutWaitingTransactionsAmount != null) {
        transactions.forEach((t, i) => i + 1 <= cashOutWaitingTransactionsAmount
            ? t.cashInSuccess(cardMeta, { customerReference: '674108327830' })
            : null);
    }
    if (completeTransactions != null) {
        transactions.forEach((t, i) => completeTransactions.includes(i + 1) ? t.cashOutSuccess(cardMeta, { customerReference: '674108327830' }) : null);
    }
    const shortTermRentCancelationStrategy = new short_term_rent_tenant_cancelation_strategy_1.ShortTermRentTenantCancelationStrategy(contract, transactions);
    return shortTermRentCancelationStrategy;
};
exports.shortTermRentTenantCancelationStrategyFactory = shortTermRentTenantCancelationStrategyFactory;
const shortTermRentLandlordCancelationStrategyFactory = ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }) => {
    const contract = (0, contract_rental_strategy_factory_1.contractRentalStrategyFactory)(contractCreateProps);
    contract.setOffer({
        allowedToHangingOut: true,
        allowedToSmoke: true,
        allowedWithChildren: true,
        allowedWithPets: true,
    });
    const transactions = contract.acceptOffer(uuid_value_object_1.UUID.generate());
    const cardMeta = {
        id: '0a991c03-1666-4dc3-b50a-7f1b699915f6',
        paymentMethod: enums_1.PaymentMethod.INNOPAY,
        cardType: 'VISA',
        panMasked: '1234',
        cardHolder: 'Roy Johnson',
    };
    if (cashOutWaitingTransactionsAmount != null) {
        transactions.forEach((t, i) => i + 1 <= cashOutWaitingTransactionsAmount
            ? t.cashInSuccess(cardMeta, { customerReference: '674108327830' })
            : null);
    }
    if (completeTransactions != null) {
        transactions.forEach((t, i) => completeTransactions.includes(i + 1) ? t.cashOutSuccess(cardMeta, { customerReference: '674108327830' }) : null);
    }
    const shortTermRentCancelationStrategy = new short_term_rent_landlord_cancelation_strategy_1.ShortTermRentLandlordCancelationStrategy(contract, transactions);
    return shortTermRentCancelationStrategy;
};
exports.shortTermRentLandlordCancelationStrategyFactory = shortTermRentLandlordCancelationStrategyFactory;
//# sourceMappingURL=short-term-rent-cancelation-strategy.factory.js.map