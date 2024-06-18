import { AdminCancelationMode, CancellationTrigger } from '@domains/contract/domain/types';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class CancelConcludedContractCommand {
  public constructor(
    public readonly props: {
      contractId: UUID;
      trigger: CancellationTrigger;
      checkOutDate?: DateISOVO;
      adminCancelMeta?: AdminCancelationMode;
    },
  ) {}
}
