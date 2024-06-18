import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { InnopayTransactionRestApiWebhookService } from './innopay-transaction.webhook.service';

@ApiBearerAuth()
@ApiTags('Webhook. Contract')
@Controller('v1/contract')
export class InnopayTransactionRestApiWebhookController {
  constructor(
    private readonly innopayTransactionRestApiWebhookService: InnopayTransactionRestApiWebhookService,
    private readonly configService: ConfigService,
  ) {}

  @Redirect('')
  @Get('modify-to-permanent')
  public async modifyToPermanent(
    @Query() { cardId, userId, customerReference }: { cardId: string; userId: string; customerReference: string },
  ): Promise<any> {
    const frontendUrl = this.configService.get('frontEnd.url') as string;
    const redirectEndpoint = '/cash-in-webhook';

    if (!cardId || !userId || !customerReference) {
      return { url: slashAgnostic(frontendUrl, `${redirectEndpoint}/?status=failure`) };
    }

    const result = await this.innopayTransactionRestApiWebhookService.handle({
      customerReference,
      cardId: Number(cardId),
      userId: Number(userId),
    });

    if (result.isErr()) {
      return { url: slashAgnostic(frontendUrl, `${redirectEndpoint}/?status=failure`) };
    }

    if (!result.unwrap()) {
      return { url: slashAgnostic(frontendUrl, `${redirectEndpoint}/?status=in-process`) };
    }

    return { url: slashAgnostic(frontendUrl, `${redirectEndpoint}/?status=success`) };
  }
}
