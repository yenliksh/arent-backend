import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ApartmentAdStatusType } from '../types';

interface ApartmentAdStatusCreateProps {
  statusType: ApartmentAdStatusType[];
  declineReason?: string | null; //TODO: make enum for reasons
}

export type ApartmentAdStatusProps = ApartmentAdStatusCreateProps;

// TODO: the ACTIVE status deprecated, don't use it, if need to get status about rented ad you can refer to longTermRentAdIsRented entity field
export class ApartmentAdStatusVO extends ValueObject<ApartmentAdStatusProps> {
  static create({ statusType, declineReason }: ApartmentAdStatusCreateProps) {
    return new ApartmentAdStatusVO({
      statusType,
      declineReason,
    });
  }

  public get statusType() {
    return this.props.statusType;
  }

  public get declineReason() {
    return this.props.declineReason;
  }

  // get isActive() {
  //   return this.statusType.includes(ApartmentAdStatusType.ACTIVE);
  // }

  get isPublished() {
    return this.statusType.includes(ApartmentAdStatusType.PUBLISHED);
  }

  get isProcessing() {
    return this.statusType.includes(ApartmentAdStatusType.PROCESSING);
  }

  get isPaused() {
    return this.statusType.includes(ApartmentAdStatusType.PAUSED);
  }

  get isDraft() {
    return this.statusType.includes(ApartmentAdStatusType.DRAFT);
  }

  protected validate(props: ApartmentAdStatusProps): void {
    const { statusType, declineReason } = props;

    if (statusType && statusType.some((i) => !Guard.isValidEnum(i, ApartmentAdStatusType))) {
      throw new ArgumentInvalidException('Unexpected rent period type');
    }

    if (declineReason && statusType.some((i) => i !== ApartmentAdStatusType.DRAFT)) {
      throw new ArgumentInvalidException('Decline reason type must have a properly type');
    }
  }
}
