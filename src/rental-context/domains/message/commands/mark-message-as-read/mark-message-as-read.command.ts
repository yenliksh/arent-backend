import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class MarkMessageAsReadCommand {
  public constructor(public readonly messageId: UUID, public readonly userId: UUID) {}
}
