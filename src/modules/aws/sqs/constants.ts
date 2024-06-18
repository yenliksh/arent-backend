export const SQSQueues = {
  checkAccessInnopayGuidQueue: {
    url: process.env.SQS_AWS_CHECK_ACCESS_INNOPAY_GUID_QUEUE_URL ?? '',
    name: process.env.SQS_AWS_CHECK_ACCESS_INNOPAY_GUID_QUEUE_NAME ?? '',
  },
  stuckedInnopayGuidStatusQueue: {
    url: process.env.SQS_AWS_STUCKED_INNOPAY_GUID_STATUS_QUEUE_URL ?? '',
    name: process.env.SQS_AWS_STUCKED_INNOPAY_GUID_STATUS_QUEUE_NAME ?? '',
  },
  cancelInnopayTransactionQueue: {
    url: process.env.SQS_AWS_CANCEL_INNOPAY_TRANSACTION_QUEUE_URL ?? '',
    name: process.env.SQS_AWS_CANCEL_INNOPAY_TRANSACTION_QUEUE_NAME ?? '',
  },
  completeCashOutInnopayTransactionQueue: {
    url: process.env.SQS_AWS_COMPLETE_CASH_OUT_QUEUE_URL ?? '',
    name: process.env.SQS_AWS_COMPLETE_CASH_OUT_QUEUE_NAME ?? '',
  },
};

export const SQS_QUEUES_NAMES: string[] = [
  SQSQueues.checkAccessInnopayGuidQueue.name,
  SQSQueues.stuckedInnopayGuidStatusQueue.name,
  SQSQueues.cancelInnopayTransactionQueue.name,
  SQSQueues.completeCashOutInnopayTransactionQueue.name,
];
