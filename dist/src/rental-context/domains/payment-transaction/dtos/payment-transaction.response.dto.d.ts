import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { PaymentTransactionModel } from '../models/payment-transaction.model';
export declare class PaymentTransactionResponse implements ProblemResponse {
    paymentTransaction?: PaymentTransactionModel;
    problem?: InnopayServiceBadRequestProblem;
    static create(props: PaymentTransactionOrmEntity): PaymentTransactionResponse;
}
