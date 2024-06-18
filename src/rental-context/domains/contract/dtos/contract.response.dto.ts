import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

import { ContractChatModel } from '../models/contract.model';
import { ContractOfferAlreadyExistsProblem } from '../problems/contract-offer-already-exists.problem';

@ObjectType()
export class ContractResponse implements ProblemResponse {
  @Field(() => ContractChatModel, { nullable: true })
  contract?: ContractChatModel;

  @Field(() => ContractOfferAlreadyExistsProblem, { nullable: true })
  problem?: ContractOfferAlreadyExistsProblem;

  static create(props: ContractOrmEntity) {
    const payload = new ContractResponse();

    payload.contract = ContractChatModel.create(props);

    return payload;
  }
}
