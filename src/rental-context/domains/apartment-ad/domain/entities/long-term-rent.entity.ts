import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';

import { ApartmentAdConstrainError } from '../errors/apartment-ad-constrain.errors';
import { ApartmentAdPauseError } from '../errors/apartment-ad-pause.error';
import { ApartmentAdPublishError } from '../errors/apartment-ad-publish.errors';
import { ApartmentAdHasEmptyFieldsError } from '../errors/apartment-ad.errors';
import { ApartmentAdStatusType } from '../types';
import { ApartmentAdStatusVO } from '../value-objects/apartment-ad-status.value-object';
import { LongTermRentCancellationPolicyVO } from '../value-objects/long-term-rent-cancellation-policy.value-object';

export interface CreateLongTermRentProps {
  apartmentAdId: UUID;
  cost: number;
}

export interface LongTermRentProps {
  apartmentAdId: UUID;
  costAndCurrency: CostAndCurrencyVO;
  isApproved: boolean;
  status: ApartmentAdStatusVO;
  ownershipDocuments?: DocumentsVO;
  cancellationPolicy?: LongTermRentCancellationPolicyVO;
}

export class LongTermRentEntity extends Entity<LongTermRentProps> {
  protected readonly _id: UUID;

  static create({ apartmentAdId, cost }: CreateLongTermRentProps): LongTermRentEntity {
    const id = UUID.generate();

    const props: LongTermRentProps = {
      apartmentAdId,
      isApproved: false,
      costAndCurrency: CostAndCurrencyVO.create({
        cost,
      }),
      status: ApartmentAdStatusVO.create({ statusType: [ApartmentAdStatusType.DRAFT] }),
    };

    const longTermRent = new LongTermRentEntity({ id, props });

    return longTermRent;
  }

  get id() {
    return this._id;
  }

  public get apartmentAdId() {
    return this.props.apartmentAdId;
  }

  public get costAndCurrency() {
    return this.props.costAndCurrency;
  }

  get cancellationPolicy(): LongTermRentCancellationPolicyType | undefined {
    return this.props.cancellationPolicy?.value;
  }

  get status() {
    return this.props.status;
  }

  get isApproved() {
    return this.props.isApproved;
  }

  setCost(cost: number) {
    this.props.costAndCurrency = CostAndCurrencyVO.create({
      cost,
    });
  }

  sendToApprove() {
    if (this.props.isApproved) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [...new Set([...this.props.status.statusType])],
        declineReason: null,
      });
      return this;
    }

    if (this.props.status.isDraft) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PROCESSING],
        declineReason: null,
      });
      return this;
    }
  }

  pause() {
    if (this.props.isApproved && this.props.status.isPublished) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PAUSED],
        declineReason: this.props.status.declineReason,
      });
      return this;
    }

    throw new ApartmentAdPauseError();
  }

  publish() {
    if (this.props.isApproved && this.props.status.isPaused) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PUBLISHED],
        declineReason: this.props.status.declineReason,
      });
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  get hasOwnershipDocuments() {
    return !!this.props.ownershipDocuments?.fileKeys;
  }

  approve() {
    if (!this.hasOwnershipDocuments) {
      throw new IllegalOperationException('User can not have published ads without ownership documents');
    }

    if (this.props.isApproved && this.props.status.isProcessing) {
      // TODO: merge copied values to main object
    }

    if (this.props.status.isProcessing) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PUBLISHED],
      });
      this.props.isApproved = true;
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  reject(declineReason: string) {
    if (this.props.status.isProcessing) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.DRAFT],
        declineReason,
      });
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  get isPublishable() {
    const { apartmentAdId, costAndCurrency, isApproved, status } = this.props;

    const fields = [apartmentAdId, costAndCurrency, isApproved, status];

    if (fields.some((f) => f == null)) {
      return false;
    }

    return true;
  }

  setOwnershipDocuments(documents: string[]) {
    if (this.props.isApproved) {
      throw new ApartmentAdConstrainError('Change ownership documents cannot be applied for approved ad');
    }

    this.props.ownershipDocuments = new DocumentsVO({ fileKeys: documents });
  }

  validate(): void {
    const {
      apartmentAdId,
      costAndCurrency: { cost, currency },
    } = this.props;

    const fields = [apartmentAdId, cost, currency];

    if (fields.some((f) => f == null)) {
      throw new ApartmentAdHasEmptyFieldsError('Long term rent must to have complete all required fields');
    }
  }
}
