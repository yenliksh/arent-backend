import { Destination, Message, RawMessage } from 'aws-sdk/clients/ses';
import { SESService } from './ses.service';
export declare class SimpleEmailService {
    private readonly sesService;
    constructor(sesService: SESService);
    sendEmail({ source, destination, message, }: {
        source: string;
        destination: Destination;
        message: Message;
    }): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendEmailResponse, import("aws-sdk").AWSError>>;
    sendRawEmail({ rawMessage }: {
        rawMessage: RawMessage;
    }): Promise<import("aws-sdk/lib/request").PromiseResult<import("aws-sdk/clients/ses").SendRawEmailResponse, import("aws-sdk").AWSError>>;
}
