import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContractCancelationModel extends ModelBase {
  @Field(() => String, { description: 'ex. 2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  contractId: string;

  @Field(() => String)
  cancelationDate: string;

  @Field(() => String)
  checkOutDate: string;

  @Field(() => String)
  refundsAmountToSenderCost: string;

  @Field(() => String)
  refundsAmountToSenderCurrency: string;

  static create(props: ContractCancelationOrmEntity) {
    const payload = new ContractCancelationModel(props);

    payload.contractId = props.contractId;
    payload.cancelationDate = props.cancelationDate;
    payload.checkOutDate = props.checkOutDate;
    payload.refundsAmountToSenderCost = toMinorUnitString(props.refundsAmountToSenderCost);
    payload.refundsAmountToSenderCurrency = props.refundsAmountToSenderCurrency;

    return payload;
  }
}
