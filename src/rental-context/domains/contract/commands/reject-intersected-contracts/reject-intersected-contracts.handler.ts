import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractExceptions } from '@domains/contract/bulls/types';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ContractStatus } from '@infrastructure/enums';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RejectIntersectedContractsCommand } from './reject-intersected-contracts.command';

@CommandHandler(RejectIntersectedContractsCommand)
export class RejectIntersectedContractsHandler implements ICommandHandler<RejectIntersectedContractsCommand> {
  private isProd: boolean;

  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly pubSubService: PubSubService,
    private readonly configService: ConfigService,
  ) {
    this.isProd = this.configService.get<string>('nodeEnv') === 'production';
  }

  public async execute(command: RejectIntersectedContractsCommand) {
    const { concludedContractId } = command;

    const concludedContract = await this.contractRepository.findOneById(concludedContractId.value);

    if (
      !concludedContract ||
      ![ContractStatus.CONCLUDED, ContractStatus.COMPLETED].includes(concludedContract.status.value)
    ) {
      throw new NotFoundException('Contract not found');
    }

    const contractsNeedToCancel = await this.contractRepository.findManyForReject({
      apartmentAdId: concludedContract.apartmentAdIdOrFail.value,
      apartmentRentPeriodType: concludedContract.apartmentRentPeriodType,
      from: concludedContract.arrivalDateOrFail,
      to: concludedContract.departureDateOrFail,
    });

    await Promise.all(
      contractsNeedToCancel.map((contract) => {
        contract.reject();

        return this.contractRepository.save(contract);
      }),
    );

    contractsNeedToCancel.forEach((contract) => this.publishContract(contract, ContractPubSubEvent.UPDATED));
  }

  async publishContract(contract: ContractEntity, event: ContractPubSubEvent, error?: ContractExceptions) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    await this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event,
      error: this.isProd ? undefined : error,
    });
  }
}
