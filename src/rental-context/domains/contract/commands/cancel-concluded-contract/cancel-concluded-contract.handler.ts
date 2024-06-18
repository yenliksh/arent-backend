import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentQueue } from '@domains/payment-transaction/bulls/queue/payment.queue';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { CancelConcludedContractCommand } from './cancel-concluded-contract.command';

@CommandHandler(CancelConcludedContractCommand)
export class CancelConcludedContractHandler implements ICommandHandler<CancelConcludedContractCommand> {
  constructor(private readonly contractRepository: ContractRepository, private readonly paymentQueue: PaymentQueue) {}

  public async execute(
    command: CancelConcludedContractCommand,
  ): Promise<Result<UUID, NotFoundException | ArgumentInvalidException>> {
    const { contractId, checkOutDate, trigger, adminCancelMeta } = command.props;

    const contract = await this.contractRepository.findOneById(contractId.value);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }
    if (!contract.isCanCancelled) {
      return Err(new ArgumentInvalidException('You cannot cancel this contract'));
    }

    contract.setPending();

    await this.contractRepository.save(contract);

    const checkOutDateTime = checkOutDate
      ? this.addDepartureTime(checkOutDate.value, contract.departureDateOrFail)
      : undefined;

    this.paymentQueue.addCancelJob({
      contractId: contractId.value,
      trigger,
      checkOutDate: checkOutDateTime?.value,
      adminCancelMeta,
    });

    return Ok(contractId);
  }

  private addDepartureTime(date: string, contractDepartureDate: string) {
    const departureDate = new Date(contractDepartureDate);

    const hours = departureDate.getHours();
    const minutes = departureDate.getMinutes();

    const dateWithHours = DateUtil.add(date, { value: hours, unit: 'hour' }).toISOString();
    const isoDate = DateUtil.add(dateWithHours, { value: minutes, unit: 'minute' }).toISOString();

    return new DateTimeISOTZVO(isoDate);
  }
}
