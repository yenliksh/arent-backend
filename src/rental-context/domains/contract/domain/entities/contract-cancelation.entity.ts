import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { ContractHasEmptyFieldsError } from '../errors/contract.errors';

export interface CreateContractCancelationProps {
  contractId: UUID;
  triggerUserId: UUID;
  cancelationDate: DateTimeISOTZVO; // дата совершения отмены
  checkOutDate: DateTimeISOTZVO; // новая дата выезда
  refundsAmountToSender: CostAndCurrencyVO; // деньги которые нужно вернуть тенанту
  transferAmountToRecipient: CostAndCurrencyVO; // деньги которые нужно перевести из сабсчета лендлорду
  transferAmountToPlatform: CostAndCurrencyVO; // деньги которые нужно перевести Livin
  withdrawalAmountFromSender: CostAndCurrencyVO; // деньги которые нужно списать с тенанта
  withdrawalAmountFromRecipient: CostAndCurrencyVO; // деньги которые нужно списать с лендлорда
  isFine: boolean; // если true значит инкрементируем штраф лендлорду (user.entity)
}

export type ContractCancelationProps = Omit<CreateContractCancelationProps, 'triggerUserId'> & {
  triggerUserId?: UUID;
};

export class ContractCancelationEntity extends Entity<ContractCancelationProps> {
  protected readonly _id: UUID;

  static create({
    cancelationDate,
    checkOutDate,
    contractId,
    refundsAmountToSender,
    transferAmountToPlatform,
    transferAmountToRecipient,
    withdrawalAmountFromSender,
    withdrawalAmountFromRecipient,
    isFine,
    triggerUserId,
  }: CreateContractCancelationProps): ContractCancelationEntity {
    const id = UUID.generate();

    const props: ContractCancelationProps = {
      cancelationDate,
      checkOutDate,
      contractId,
      refundsAmountToSender,
      transferAmountToPlatform,
      transferAmountToRecipient,
      withdrawalAmountFromSender,
      withdrawalAmountFromRecipient,
      isFine,
      triggerUserId,
    };

    const contractCancelation = new ContractCancelationEntity({ id, props });

    return contractCancelation;
  }

  validate(): void {
    const { contractId, isFine } = this.props;

    const fields = [contractId, isFine];

    if (fields.some((f) => f == null)) {
      throw new ContractHasEmptyFieldsError('Contract cancelation must to have complete all required fields');
    }
  }
}
