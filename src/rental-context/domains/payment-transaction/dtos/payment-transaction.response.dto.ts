import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaymentTransactionModel } from '../models/payment-transaction.model';

@ObjectType()
export class PaymentTransactionResponse implements ProblemResponse {
  @Field(() => PaymentTransactionModel, { nullable: true })
  paymentTransaction?: PaymentTransactionModel;

  @Field(() => InnopayServiceBadRequestProblem, { nullable: true })
  problem?: InnopayServiceBadRequestProblem;

  static create(props: PaymentTransactionOrmEntity) {
    const payload = new PaymentTransactionResponse();

    payload.paymentTransaction = PaymentTransactionModel.create(props);

    return payload;
  }
}
