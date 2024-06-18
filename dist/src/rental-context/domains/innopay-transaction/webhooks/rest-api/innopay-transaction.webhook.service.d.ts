import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ArgumentInvalidException } from '@libs/exceptions';
import { BadGatewayException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InnopayStatusService } from '@third-parties/innopay-payment/src/services/innopay-status.service';
import { Result } from 'oxide.ts';
import { StuckedInnopayGuidStatusProducer } from '../../bulls/sqs-producers/stucked-innopay-guid-status.producer';
export interface InnopayTransactionRestApiWebhookRequest {
    readonly customerReference: string;
    readonly cardId: number;
    readonly userId: number;
}
export declare class InnopayTransactionRestApiWebhookService {
    private readonly contractRepository;
    private readonly sqsProducer;
    private readonly innopayStatusService;
    private commandBus;
    constructor(contractRepository: ContractRepository, sqsProducer: StuckedInnopayGuidStatusProducer, innopayStatusService: InnopayStatusService, commandBus: CommandBus);
    private readonly innopayStateMapper;
    private readonly responseByState;
    handle(dto: InnopayTransactionRestApiWebhookRequest): Promise<Result<boolean, ArgumentInvalidException | BadGatewayException>>;
    private handleSuccessState;
    private handleReadyToCompleteState;
    private handleInProgressState;
    private handleFailedState;
}
