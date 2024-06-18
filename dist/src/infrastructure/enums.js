"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsEnum = exports.ObjectPlacementEnum = exports.GasSupplyEnum = exports.ElectricitySupplyEnum = exports.WaterSupplyEnum = exports.ShortTermRentPaymentType = exports.ShortTermRentBookingType = exports.PaymentMethod = exports.ContractRentStatus = exports.MiddleTermRentCancellationPolicyType = exports.LongTermRentCancellationPolicyType = exports.ShortTermRentCancellationPolicyType = exports.ContractStatus = exports.ApartmentRentPeriodType = exports.FileCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
var FileCategory;
(function (FileCategory) {
    FileCategory["AVATARS"] = "AVATARS";
    FileCategory["APARTMENT_AD_MEDIA"] = "APARTMENT_AD_MEDIA";
    FileCategory["APARTMENT_AD_DOCUMENTS"] = "APARTMENT_AD_DOCUMENTS";
    FileCategory["IDENTITY_DOCUMENTS"] = "IDENTITY_DOCUMENTS";
    FileCategory["CHAT_MEDIA"] = "CHAT_MEDIA";
})(FileCategory = exports.FileCategory || (exports.FileCategory = {}));
(0, graphql_1.registerEnumType)(FileCategory, {
    name: 'FileCategory',
});
var ApartmentRentPeriodType;
(function (ApartmentRentPeriodType) {
    ApartmentRentPeriodType["LONG_TERM"] = "LONG_TERM";
    ApartmentRentPeriodType["SHORT_TERM"] = "SHORT_TERM";
})(ApartmentRentPeriodType = exports.ApartmentRentPeriodType || (exports.ApartmentRentPeriodType = {}));
(0, graphql_1.registerEnumType)(ApartmentRentPeriodType, {
    name: 'ApartmentRentPeriodType',
});
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["REJECTED"] = "REJECTED";
    ContractStatus["CREATED"] = "CREATED";
    ContractStatus["OFFERING"] = "OFFERING";
    ContractStatus["CONCLUDED"] = "CONCLUDED";
    ContractStatus["COMPLETED"] = "COMPLETED";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
(0, graphql_1.registerEnumType)(ContractStatus, {
    name: 'ContractStatus',
});
var ShortTermRentCancellationPolicyType;
(function (ShortTermRentCancellationPolicyType) {
    ShortTermRentCancellationPolicyType["FLEXIBLE"] = "FLEXIBLE";
    ShortTermRentCancellationPolicyType["MODERATE"] = "MODERATE";
    ShortTermRentCancellationPolicyType["INFLEXIBLE"] = "INFLEXIBLE";
    ShortTermRentCancellationPolicyType["STRICT"] = "STRICT";
})(ShortTermRentCancellationPolicyType = exports.ShortTermRentCancellationPolicyType || (exports.ShortTermRentCancellationPolicyType = {}));
(0, graphql_1.registerEnumType)(ShortTermRentCancellationPolicyType, {
    name: 'ShortTermRentCancellationPolicyType',
});
var LongTermRentCancellationPolicyType;
(function (LongTermRentCancellationPolicyType) {
    LongTermRentCancellationPolicyType["FORFEIT"] = "FORFEIT";
})(LongTermRentCancellationPolicyType = exports.LongTermRentCancellationPolicyType || (exports.LongTermRentCancellationPolicyType = {}));
(0, graphql_1.registerEnumType)(LongTermRentCancellationPolicyType, {
    name: 'LongTermRentCancellationPolicyType',
});
var MiddleTermRentCancellationPolicyType;
(function (MiddleTermRentCancellationPolicyType) {
    MiddleTermRentCancellationPolicyType["DEFAULT"] = "DEFAULT";
})(MiddleTermRentCancellationPolicyType = exports.MiddleTermRentCancellationPolicyType || (exports.MiddleTermRentCancellationPolicyType = {}));
(0, graphql_1.registerEnumType)(MiddleTermRentCancellationPolicyType, {
    name: 'MiddleTermRentCancellationPolicyType',
});
var ContractRentStatus;
(function (ContractRentStatus) {
    ContractRentStatus["CONCLUDED"] = "CONCLUDED";
    ContractRentStatus["COMPLETED"] = "COMPLETED";
})(ContractRentStatus = exports.ContractRentStatus || (exports.ContractRentStatus = {}));
(0, graphql_1.registerEnumType)(ContractRentStatus, {
    name: 'ContractRentStatus',
});
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["INNOPAY"] = "INNOPAY";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
(0, graphql_1.registerEnumType)(PaymentMethod, {
    name: 'PaymentMethod',
});
var ShortTermRentBookingType;
(function (ShortTermRentBookingType) {
    ShortTermRentBookingType["REQUEST"] = "REQUEST";
    ShortTermRentBookingType["INSTANT"] = "INSTANT";
})(ShortTermRentBookingType = exports.ShortTermRentBookingType || (exports.ShortTermRentBookingType = {}));
(0, graphql_1.registerEnumType)(ShortTermRentBookingType, {
    name: 'ShortTermRentBookingType',
});
var ShortTermRentPaymentType;
(function (ShortTermRentPaymentType) {
    ShortTermRentPaymentType["FULL"] = "FULL";
    ShortTermRentPaymentType["PARTIAL"] = "PARTIAL";
})(ShortTermRentPaymentType = exports.ShortTermRentPaymentType || (exports.ShortTermRentPaymentType = {}));
(0, graphql_1.registerEnumType)(ShortTermRentPaymentType, {
    name: 'ShortTermRentPaymentType',
});
var WaterSupplyEnum;
(function (WaterSupplyEnum) {
    WaterSupplyEnum["CENTRALWATERSUPPLY"] = "centralWaterSupply";
    WaterSupplyEnum["POSSIBLETOCONNECT"] = "possibleToConnect";
    WaterSupplyEnum["WELL"] = "well";
    WaterSupplyEnum["NOT"] = "not";
})(WaterSupplyEnum = exports.WaterSupplyEnum || (exports.WaterSupplyEnum = {}));
var ElectricitySupplyEnum;
(function (ElectricitySupplyEnum) {
    ElectricitySupplyEnum["YES"] = "yes";
    ElectricitySupplyEnum["POSSIBLETOCONNECT"] = "possibleToConnect";
    ElectricitySupplyEnum["NOT"] = "not";
})(ElectricitySupplyEnum = exports.ElectricitySupplyEnum || (exports.ElectricitySupplyEnum = {}));
var GasSupplyEnum;
(function (GasSupplyEnum) {
    GasSupplyEnum["TRUNKAUTONOMOUS"] = "trunkAutonomous";
    GasSupplyEnum["POSSIBLETOCONNECT"] = "possibleToConnect";
    GasSupplyEnum["NOT"] = "not";
})(GasSupplyEnum = exports.GasSupplyEnum || (exports.GasSupplyEnum = {}));
var ObjectPlacementEnum;
(function (ObjectPlacementEnum) {
    ObjectPlacementEnum["BUSINESSCENTER"] = "businessCenter";
    ObjectPlacementEnum["RESIDENTIONALCOMPLEX"] = "residentionalComplex";
    ObjectPlacementEnum["MALL"] = "mall";
    ObjectPlacementEnum["UNIVERSALMARKET"] = "universalMarket";
    ObjectPlacementEnum["DETACHEDBUILDING"] = "detachedBuilding";
})(ObjectPlacementEnum = exports.ObjectPlacementEnum || (exports.ObjectPlacementEnum = {}));
var CommunicationsEnum;
(function (CommunicationsEnum) {
    CommunicationsEnum["LIGHT"] = "light";
    CommunicationsEnum["WATER"] = "water";
    CommunicationsEnum["GAS"] = "gas";
    CommunicationsEnum["SEWERAGE"] = "sewerage";
    CommunicationsEnum["HEATING"] = "heating";
    CommunicationsEnum["VENTILATION"] = "ventilation";
})(CommunicationsEnum = exports.CommunicationsEnum || (exports.CommunicationsEnum = {}));
//# sourceMappingURL=enums.js.map