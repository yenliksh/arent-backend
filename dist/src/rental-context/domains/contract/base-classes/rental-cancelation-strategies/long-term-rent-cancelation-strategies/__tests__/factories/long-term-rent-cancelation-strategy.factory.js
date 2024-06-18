"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longTermRentLandlordCancelationStrategyFactory = exports.longTermRentTenantCancelationStrategyFactory = void 0;
const contract_rental_strategy_factory_1 = require("../../../../rental-strategies/__tests__/factories/contract-rental-strategy.factory");
const enums_1 = require("../../../../../../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const long_term_rent_landlord_cancelation_strategy_1 = require("../../long-term-rent-landlord-cancelation.strategy");
const long_term_rent_tenant_cancelation_strategy_1 = require("../../long-term-rent-tenant-cancelation.strategy");
const longTermRentTenantCancelationStrategyFactory = ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }) => {
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
    const longTermRentCancelationStrategy = new long_term_rent_tenant_cancelation_strategy_1.LongTermRentTenantCancelationStrategy(contract, transactions);
    return longTermRentCancelationStrategy;
};
exports.longTermRentTenantCancelationStrategyFactory = longTermRentTenantCancelationStrategyFactory;
const longTermRentLandlordCancelationStrategyFactory = ({ contractCreateProps, cashOutWaitingTransactionsAmount, completeTransactions, }) => {
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
    const longTermRentCancelationStrategy = new long_term_rent_landlord_cancelation_strategy_1.LongTermRentLandlordCancelationStrategy(contract, transactions);
    return longTermRentCancelationStrategy;
};
exports.longTermRentLandlordCancelationStrategyFactory = longTermRentLandlordCancelationStrategyFactory;
//# sourceMappingURL=long-term-rent-cancelation-strategy.factory.js.map