import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SaveCardEndService } from '../commands/save-card-end/save-card-end.service';

@ApiBearerAuth()
@ApiTags('Webhook. InnopayCard')
@Controller('v1/innopay-card')
export class InnopayCardController {
  constructor(private readonly saveCardEndService: SaveCardEndService, private readonly configService: ConfigService) {}

  @Redirect('')
  @Get('save-card-end')
  public async refreshToken(
    @Query() { cardId, userId, customerReference }: { cardId: number; userId: number; customerReference: string },
  ): Promise<any> {
    const frontendUrl = this.configService.get('frontEnd.url') as string;

    if (!cardId || !userId || !customerReference) {
      return { url: slashAgnostic(frontendUrl, 'add-payment-method-result/?status=failure') };
    }

    const result = await this.saveCardEndService.handle({ cnpCardId: cardId, cnpUserId: userId, customerReference });

    if (result.isErr()) {
      return { url: slashAgnostic(frontendUrl, 'add-payment-method-result/?status=failure') };
    }

    return { url: slashAgnostic(frontendUrl, 'add-payment-method-result/?status=success') };
  }
}
