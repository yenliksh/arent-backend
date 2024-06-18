import { SNSService } from './sns.service';
export declare class SimpleNotificationService {
    private readonly snsService;
    constructor(snsService: SNSService);
    publish({ phoneNumber, message }: {
        phoneNumber: string;
        message: string;
    }): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/sns").PublishResponse, import("aws-sdk").AWSError>>;
}
