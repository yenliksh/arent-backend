"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayAppointmentCardType = exports.InnopayCardType = void 0;
const graphql_1 = require("@nestjs/graphql");
var InnopayCardType;
(function (InnopayCardType) {
    InnopayCardType["VISA"] = "VISA";
    InnopayCardType["MASTERCARD"] = "MASTERCARD";
})(InnopayCardType = exports.InnopayCardType || (exports.InnopayCardType = {}));
(0, graphql_1.registerEnumType)(InnopayCardType, {
    name: 'InnopayCardType',
});
var InnopayAppointmentCardType;
(function (InnopayAppointmentCardType) {
    InnopayAppointmentCardType["CHARGE_OFF"] = "CHARGE_OFF";
    InnopayAppointmentCardType["CREDITING"] = "CREDITING";
})(InnopayAppointmentCardType = exports.InnopayAppointmentCardType || (exports.InnopayAppointmentCardType = {}));
(0, graphql_1.registerEnumType)(InnopayAppointmentCardType, {
    name: 'InnopayAppointmentCardType',
});
//# sourceMappingURL=types.js.map