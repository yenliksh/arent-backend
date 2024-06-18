import { CreateContractAfterRequestCommand } from '@domains/contract/commands/create-contract-after-request/create-contract-after-request.command';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';

import { AcceptRequest } from './accept-request.request.dto';

@Injectable()
export class AcceptRequestService {
  constructor(
    private readonly contractRequestRepository: ContractRequestRepository,
    private commandBus: CommandBus,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async handle(
    userId: UUID,
    dto: AcceptRequest,
  ): Promise<Result<[UUID, UUID], ArgumentInvalidException | HttpException>> {
    const { contractRequestId } = dto;

    const trxId = await this.unitOfWork.start();

    try {
      const contractRequest = await this.contractRequestRepository.findOneForAccepting(
        contractRequestId,
        userId.value,
        trxId,
      );

      if (!contractRequest) {
        await this.unitOfWork.rollback(trxId);
        return Err(new NotFoundException());
      }

      const { apartmentRentPeriodType, arrivalDate, departureDate, apartmentAdId } =
        contractRequest.getRequiredDataForContract();
      const comment = contractRequest.comment;

      const isLongTermArgumentValid =
        apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM && !arrivalDate && !departureDate && !comment;

      const isShortTermArgumentValid =
        apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM && !!arrivalDate && !!departureDate;

      if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
        return Err(new ArgumentInvalidException(`Invalid arguments for ${apartmentRentPeriodType} rent period type`));
      }

      const apartmentIsFree = await this.contractRequestRepository.checkApartmentIsFree({
        apartmentAdId: apartmentAdId.value,
        apartmentRentPeriodType,
        trxId,
        from: arrivalDate?.value,
        to: departureDate?.value,
      });

      if (!apartmentIsFree) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ConflictException('Apartment is not free for these days'));
      }

      contractRequest.accept();

      await this.contractRequestRepository.save(contractRequest, trxId);

      const [_, chatId] = await this.commandBus.execute<
        CreateContractAfterRequestCommand,
        [contractId: UUID, chatId: UUID]
      >(new CreateContractAfterRequestCommand(contractRequest, trxId));

      await this.unitOfWork.commit(trxId);

      return Ok([contractRequest.id, chatId]);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }
}
