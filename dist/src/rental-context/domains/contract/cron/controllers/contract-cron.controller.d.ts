import { CommandBus } from '@nestjs/cqrs';
export declare class ContractCronController {
    private commandBus;
    constructor(commandBus: CommandBus);
    completePastContract(): Promise<boolean>;
}
