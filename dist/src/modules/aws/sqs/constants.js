"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQS_QUEUES_NAMES = exports.SQSQueues = void 0;
exports.SQSQueues = {
    checkAccessInnopayGuidQueue: {
        url: (_a = process.env.SQS_AWS_CHECK_ACCESS_INNOPAY_GUID_QUEUE_URL) !== null && _a !== void 0 ? _a : '',
        name: (_b = process.env.SQS_AWS_CHECK_ACCESS_INNOPAY_GUID_QUEUE_NAME) !== null && _b !== void 0 ? _b : '',
    },
    stuckedInnopayGuidStatusQueue: {
        url: (_c = process.env.SQS_AWS_STUCKED_INNOPAY_GUID_STATUS_QUEUE_URL) !== null && _c !== void 0 ? _c : '',
        name: (_d = process.env.SQS_AWS_STUCKED_INNOPAY_GUID_STATUS_QUEUE_NAME) !== null && _d !== void 0 ? _d : '',
    },
    cancelInnopayTransactionQueue: {
        url: (_e = process.env.SQS_AWS_CANCEL_INNOPAY_TRANSACTION_QUEUE_URL) !== null && _e !== void 0 ? _e : '',
        name: (_f = process.env.SQS_AWS_CANCEL_INNOPAY_TRANSACTION_QUEUE_NAME) !== null && _f !== void 0 ? _f : '',
    },
    completeCashOutInnopayTransactionQueue: {
        url: (_g = process.env.SQS_AWS_COMPLETE_CASH_OUT_QUEUE_URL) !== null && _g !== void 0 ? _g : '',
        name: (_h = process.env.SQS_AWS_COMPLETE_CASH_OUT_QUEUE_NAME) !== null && _h !== void 0 ? _h : '',
    },
};
exports.SQS_QUEUES_NAMES = [
    exports.SQSQueues.checkAccessInnopayGuidQueue.name,
    exports.SQSQueues.stuckedInnopayGuidStatusQueue.name,
    exports.SQSQueues.cancelInnopayTransactionQueue.name,
    exports.SQSQueues.completeCashOutInnopayTransactionQueue.name,
];
//# sourceMappingURL=constants.js.map