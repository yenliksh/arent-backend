import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class CancelContractByAdminCommand {
  public constructor(
    public readonly props: {
      contractId: UUID;
      trigger: CancellationTrigger;
      adminCancelMeta?: AdminCancelationMode;
    },
  ) {}
}
