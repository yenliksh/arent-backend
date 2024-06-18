import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { InnopayStartSaveCard } from '@third-parties/innopay-payment/src/types/innopay-payment.types';
import { Err, Ok, Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';

@Injectable()
export class SaveCardStartService {
  constructor(
    private readonly innopayCardService: InnopayCardService,
    private readonly innopayCardRepository: InnopayCardRepository,
    private readonly configService: ConfigService,
  ) {}

  async handle(userId: UUID): Promise<Result<string, InnopayServiceBadRequestProblem | BadRequestException>> {
    const innopayUser = await this.innopayCardRepository.findCreditingInnopayUser(userId.value);

    let data: InnopayStartSaveCard;
    try {
      const returnUrl = slashAgnostic(this.configService.get('backendUrl') as string, 'v1/innopay-card/save-card-end');

      data = await this.innopayCardService.startSaveCard(userId.value, returnUrl, innopayUser?.cnpUserId);
    } catch (error) {
      return Err(new InnopayServiceBadRequestProblem((error as Error).message));
    }

    if (!innopayUser) {
      await this.innopayCardRepository.saveInnopayUser({
        userId: userId.value,
        cnpUserId: data.userId,
        isCrediting: true,
      });
    }

    return Ok(data.redirectURL);
  }
}
