import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractExceptions } from '@domains/contract/bulls/types';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { ConfigService } from '@nestjs/config';
import { ICommandHandler } from '@nestjs/cqrs';
import { RejectIntersectedContractsCommand } from './reject-intersected-contracts.command';
export declare class RejectIntersectedContractsHandler implements ICommandHandler<RejectIntersectedContractsCommand> {
    private readonly contractRepository;
    private readonly pubSubService;
    private readonly configService;
    private isProd;
    constructor(contractRepository: ContractRepository, pubSubService: PubSubService, configService: ConfigService);
    execute(command: RejectIntersectedContractsCommand): Promise<void>;
    publishContract(contract: ContractEntity, event: ContractPubSubEvent, error?: ContractExceptions): Promise<void>;
}
