import { SQS_CONSUMER_EVENT_HANDLER, SQS_CONSUMER_METHOD } from './sqs.constants';
export declare const SqsMessageHandler: (name: string, batch?: boolean) => import("@nestjs/common").CustomDecorator<typeof SQS_CONSUMER_METHOD>;
export declare const SqsConsumerEventHandler: (name: string, eventName: string) => import("@nestjs/common").CustomDecorator<typeof SQS_CONSUMER_EVENT_HANDLER>;
