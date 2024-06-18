"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsConsumerEventHandler = exports.SqsMessageHandler = void 0;
const common_1 = require("@nestjs/common");
const sqs_constants_1 = require("./sqs.constants");
const SqsMessageHandler = (name, batch) => (0, common_1.SetMetadata)(sqs_constants_1.SQS_CONSUMER_METHOD, { name, batch });
exports.SqsMessageHandler = SqsMessageHandler;
const SqsConsumerEventHandler = (name, eventName) => (0, common_1.SetMetadata)(sqs_constants_1.SQS_CONSUMER_EVENT_HANDLER, { name, eventName });
exports.SqsConsumerEventHandler = SqsConsumerEventHandler;
