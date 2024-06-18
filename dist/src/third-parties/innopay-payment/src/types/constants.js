"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCashOutFinalStatus = exports.InnopayCashInCanceledStatus = exports.InnopayCashInReadyToCompleteStatus = exports.InnopayCashInSuccessStatus = exports.InnopayCashInFailedStatus = void 0;
const innopay_api_types_1 = require("../sdk/innopay-api.types");
exports.InnopayCashInFailedStatus = [
    innopay_api_types_1.CashInTransactionStatus.NO_SUCH_TRANSACTION,
    innopay_api_types_1.CashInTransactionStatus.DECLINED,
    innopay_api_types_1.CashInTransactionStatus.REVERSED,
    innopay_api_types_1.CashInTransactionStatus.REFUNDED,
];
exports.InnopayCashInSuccessStatus = [innopay_api_types_1.CashInTransactionStatus.PAID];
exports.InnopayCashInReadyToCompleteStatus = [innopay_api_types_1.CashInTransactionStatus.AUTHORISED];
exports.InnopayCashInCanceledStatus = [innopay_api_types_1.CashInTransactionStatus.REVERSED];
exports.InnopayCashOutFinalStatus = [
    innopay_api_types_1.CashOutTransactionStatus.DECLINED,
    innopay_api_types_1.CashOutTransactionStatus.REVERSED,
    innopay_api_types_1.CashOutTransactionStatus.PROCESSED,
    innopay_api_types_1.CashOutTransactionStatus.NO_SUCH_TRANSACTION,
];
//# sourceMappingURL=constants.js.map