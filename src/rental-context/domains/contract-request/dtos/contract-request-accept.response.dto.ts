import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

import { ContractRequestModel } from '../models/contract-request.model';
import { ContractRequestAlreadyExistsProblem } from '../problems/contract-request-already-exists.problem';

@ObjectType()
export class ContractRequestAcceptResponse implements ProblemResponse {
  @Field(() => ContractRequestModel, { nullable: true })
  contractRequest?: ContractRequestModel;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => ContractRequestAlreadyExistsProblem, { nullable: true })
  problem?: ContractRequestAlreadyExistsProblem;

  static create(prop: ContractRequestOrmEntity, chatId?: string) {
    const payload = new ContractRequestAcceptResponse();

    payload.contractRequest = ContractRequestModel.create(prop);
    payload.chatId = chatId;

    return payload;
  }
}
