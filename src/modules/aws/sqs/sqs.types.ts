export interface SQSSendMessage {
  queueUrl: string;
  body: any;

  // TODO: implement this params
  // MessageAttributes?: MessageBodyAttributeMap;
  // MessageSystemAttributes?: MessageBodySystemAttributeMap;
  // MessageDeduplicationId?: String;
  // MessageGroupId?: String

  // Don't supported in fifo queue
  // delaySeconds?: number;
}
