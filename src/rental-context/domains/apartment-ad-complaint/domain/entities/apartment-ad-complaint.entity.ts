import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { ComplaintHasEmptyFieldsError } from '../errors/complaint.errors';
import { AdComplaintType } from '../types';
import { AdComplaintVO } from '../value-objects/ad-complaint.value-object';

export interface CreateComplaintProps {
  userId: string;
  apartmentAdId: string;
  cause: AdComplaintType[];
  reason?: string;
}

export interface ComplaintProps {
  userId: UUID;
  apartmentAdId: UUID;
  complaint: AdComplaintVO;
  isViewed: boolean;
}

export class ApartmentAdComplaintEntity extends AggregateRoot<ComplaintProps> {
  protected _id: UUID;

  static create(createProps: CreateComplaintProps): ApartmentAdComplaintEntity {
    const id = UUID.generate();

    const props: ComplaintProps = {
      userId: new UUID(createProps.userId),
      apartmentAdId: new UUID(createProps.apartmentAdId),
      complaint: AdComplaintVO.create(createProps.cause, createProps.reason),
      isViewed: false,
    };

    const apartmentAdComplaint = new ApartmentAdComplaintEntity({ id, props });

    return apartmentAdComplaint;
  }

  get id() {
    return this._id;
  }

  get apartmentAdId() {
    return this.props.apartmentAdId;
  }

  get complaint() {
    return this.props.complaint;
  }

  adminViewed() {
    this.props.isViewed = true;

    return this;
  }

  public validate(): void {
    const { userId, apartmentAdId, complaint } = this.props;

    const fields = [userId, apartmentAdId, complaint];

    if (fields.some((f) => f == null)) {
      throw new ComplaintHasEmptyFieldsError('Complaint must to complete all required fields');
    }
  }
}
