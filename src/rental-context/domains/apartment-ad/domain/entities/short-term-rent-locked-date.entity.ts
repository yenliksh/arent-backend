import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface LockedDateProps {
  shortTermRentId: UUID;
  startDate: DateISOVO;
  endDate: DateISOVO;
}

export interface LockedDateCreateProps {
  shortTermRentId: string;
  startDate: string;
  endDate: string;
}

export class ShortTermRentLockedDateEntity extends Entity<LockedDateProps> {
  protected readonly _id: UUID;

  static create({ shortTermRentId, startDate, endDate }: LockedDateCreateProps): ShortTermRentLockedDateEntity {
    const id = UUID.generate();

    const props: LockedDateProps = {
      shortTermRentId: new UUID(shortTermRentId),
      startDate: new DateISOVO(startDate),
      endDate: new DateISOVO(endDate),
    };

    const shortTermRent = new ShortTermRentLockedDateEntity({ id, props });

    return shortTermRent;
  }

  values() {
    return {
      id: this._id,
      shortTermRentId: this.props.shortTermRentId,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  validate(): void {
    const { startDate, endDate } = this.props;

    const fields = [startDate, endDate];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException('Locked dates must to have complete all required fields');
    }
  }
}
