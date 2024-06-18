"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCapacityType = exports.ApartmentAdStatusType = exports.StageCreatingType = exports.ApartmentCategory = exports.ApartmentType = exports.ApartmentRuleType = exports.RentPeriodType = exports.CurrencyType = void 0;
const graphql_1 = require("@nestjs/graphql");
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["USD"] = "USD";
    CurrencyType["KZT"] = "KZT";
    CurrencyType["RUB"] = "RUB";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
(0, graphql_1.registerEnumType)(CurrencyType, {
    name: 'Currency',
});
var RentPeriodType;
(function (RentPeriodType) {
    RentPeriodType["LONG_TERM"] = "LONG_TERM";
    RentPeriodType["SHORT_TERM"] = "SHORT_TERM";
    RentPeriodType["ALL"] = "ALL";
})(RentPeriodType = exports.RentPeriodType || (exports.RentPeriodType = {}));
(0, graphql_1.registerEnumType)(RentPeriodType, {
    name: 'RentPeriodType',
});
var ApartmentRuleType;
(function (ApartmentRuleType) {
    ApartmentRuleType["ALLOWED_WITH_CHILDREN"] = "ALLOWED_WITH_CHILDREN";
    ApartmentRuleType["ALLOWED_WITH_PETS"] = "ALLOWED_WITH_PETS";
    ApartmentRuleType["ALLOWED_TO_SMOKE"] = "ALLOWED_TO_SMOKE";
    ApartmentRuleType["ALLOWED_TO_HANGING_OUT"] = "ALLOWED_TO_HANGING_OUT";
})(ApartmentRuleType = exports.ApartmentRuleType || (exports.ApartmentRuleType = {}));
(0, graphql_1.registerEnumType)(ApartmentRuleType, {
    name: 'ApartmentRuleType',
});
var ApartmentType;
(function (ApartmentType) {
    ApartmentType["FLAT"] = "FLAT";
    ApartmentType["ROOM"] = "ROOM";
    ApartmentType["COTTAGE"] = "COTTAGE";
    ApartmentType["HOSTEL"] = "HOSTEL";
    ApartmentType["MINI_HOTEL"] = "MINI_HOTEL";
    ApartmentType["GUESTHOUSE"] = "GUESTHOUSE";
    ApartmentType["APARTHOTEL"] = "APARTHOTEL";
    ApartmentType["IHC"] = "IHC";
    ApartmentType["PC"] = "PC";
    ApartmentType["LGX"] = "LGX";
    ApartmentType["LANDFORGARDEN"] = "LANDFORGARDEN";
    ApartmentType["COMMERCIAL"] = "COMMERCIAL";
    ApartmentType["COUNTRYCONSTRUCTION"] = "COUNTRYCONSTRUCTION";
    ApartmentType["OTHER"] = "OTHER";
    ApartmentType["FREEAPPOINTMENT"] = "FREEAPPOINTMENT";
    ApartmentType["OFFICE"] = "OFFICE";
    ApartmentType["STORAGE"] = "STORAGE";
    ApartmentType["PUBLICCATERING"] = "PUBLICCATERING";
    ApartmentType["SHOP"] = "SHOP";
    ApartmentType["BEAUTYSALOON"] = "BEAUTYSALOON";
    ApartmentType["CARSERVICE"] = "CARSERVICE";
    ApartmentType["INDUSTRIALBASE"] = "INDUSTRIALBASE";
    ApartmentType["FACTORY"] = "FACTORY";
})(ApartmentType = exports.ApartmentType || (exports.ApartmentType = {}));
var ApartmentCategory;
(function (ApartmentCategory) {
    ApartmentCategory["FLAT"] = "FLAT";
    ApartmentCategory["HOUSE"] = "HOUSE";
    ApartmentCategory["COUNTRYHOUSE"] = "COUNTRYHOUSE";
    ApartmentCategory["AREA"] = "AREA";
    ApartmentCategory["COMMERCIAL"] = "COMMERCIAL";
    ApartmentCategory["INDUSTRIAL"] = "INDUSTRIAL";
    ApartmentCategory["FOREIGN"] = "FOREIGN";
    ApartmentCategory["OTHERREALESTATE"] = "OTHERREALESTATE";
})(ApartmentCategory = exports.ApartmentCategory || (exports.ApartmentCategory = {}));
(0, graphql_1.registerEnumType)(ApartmentType, {
    name: 'ApartmentType',
});
(0, graphql_1.registerEnumType)(ApartmentCategory, {
    name: 'ApartmentCategory',
});
var StageCreatingType;
(function (StageCreatingType) {
    StageCreatingType["FORMAT_AND_COST_OF_RENT"] = "FORMAT_AND_COST_OF_RENT";
    StageCreatingType["SELECT_TYPE_OF_APARTMENT"] = "SELECT_TYPE_OF_APARTMENT";
    StageCreatingType["MORE_ABOUT_APARTMENT"] = "MORE_ABOUT_APARTMENT";
    StageCreatingType["ADDRESS"] = "ADDRESS";
    StageCreatingType["PHOTOS"] = "PHOTOS";
    StageCreatingType["DESCRIPTION_OF_APARTMENT"] = "DESCRIPTION_OD_APARTMENT";
    StageCreatingType["VITAL_INFORMATION"] = "VITAL_INFORMATION";
})(StageCreatingType = exports.StageCreatingType || (exports.StageCreatingType = {}));
(0, graphql_1.registerEnumType)(StageCreatingType, {
    name: 'StageCreatingType',
});
var ApartmentAdStatusType;
(function (ApartmentAdStatusType) {
    ApartmentAdStatusType["ACTIVE"] = "ACTIVE";
    ApartmentAdStatusType["PUBLISHED"] = "PUBLISHED";
    ApartmentAdStatusType["PROCESSING"] = "PROCESSING";
    ApartmentAdStatusType["PAUSED"] = "PAUSED";
    ApartmentAdStatusType["DRAFT"] = "DRAFT";
})(ApartmentAdStatusType = exports.ApartmentAdStatusType || (exports.ApartmentAdStatusType = {}));
(0, graphql_1.registerEnumType)(ApartmentAdStatusType, {
    name: 'ApartmentAdStatusType',
});
var LegalCapacityType;
(function (LegalCapacityType) {
    LegalCapacityType["INDIVIDUAL"] = "INDIVIDUAL";
    LegalCapacityType["LEGAL_ENTITY"] = "LEGAL_ENTITY";
})(LegalCapacityType = exports.LegalCapacityType || (exports.LegalCapacityType = {}));
(0, graphql_1.registerEnumType)(LegalCapacityType, {
    name: 'LegalCapacityType',
});
//# sourceMappingURL=types.js.map