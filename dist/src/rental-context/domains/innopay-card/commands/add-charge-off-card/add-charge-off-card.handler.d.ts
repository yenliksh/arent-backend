import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentNotProvidedException } from '@libs/exceptions';
import { ICommandHandler } from '@nestjs/cqrs';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Result } from 'oxide.ts';
import { AddChargeOffCardCommand } from './add-charge-off-card.command';
export declare class AddChargeOffCardHandler implements ICommandHandler<AddChargeOffCardCommand> {
    private readonly innopayCardService;
    private readonly innopayCardRepository;
    constructor(innopayCardService: InnopayCardService, innopayCardRepository: InnopayCardRepository);
    execute(command: AddChargeOffCardCommand): Promise<Result<UUID, ArgumentNotProvidedException>>;
}
