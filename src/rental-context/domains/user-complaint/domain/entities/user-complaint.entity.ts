import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { UserComplaintVO } from '@domains/user-complaint/domain/value-objects/user-complaint.value-object';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { UserComplaintHasEmptyFieldsError } from '../errors/user-complaint.error';

export interface CreateUserComplaintProps {
  senderUserId: string;
  recipientUserId: string;
  cause: UserComplaintType[];
  reason?: string;
}

export interface UserComplaintProps {
  senderUserId: UUID;
  recipientUserId: UUID;
  complaint: UserComplaintVO;
  isViewed: boolean;
}

export class UserComplaintEntity extends AggregateRoot<UserComplaintProps> {
  protected _id: UUID;

  static create(createProps: CreateUserComplaintProps): UserComplaintEntity {
    const id = UUID.generate();

    const props: UserComplaintProps = {
      senderUserId: new UUID(createProps.senderUserId),
      recipientUserId: new UUID(createProps.recipientUserId),
      complaint: UserComplaintVO.create(createProps.cause, createProps.reason),
      isViewed: false,
    };

    const userComplaint = new UserComplaintEntity({ id, props });

    return userComplaint;
  }

  get id() {
    return this._id;
  }

  get recipientUserId() {
    return this.props.recipientUserId;
  }

  get complaint() {
    return this.props.complaint;
  }

  adminViewed() {
    this.props.isViewed = true;

    return this;
  }

  public validate(): void {
    const { senderUserId, recipientUserId, complaint } = this.props;

    const fields = [senderUserId, recipientUserId, complaint];

    if (fields.some((f) => f == null)) {
      throw new UserComplaintHasEmptyFieldsError('Complaint must to complete all required fields');
    }

    if (senderUserId.value === recipientUserId.value) {
      throw new ArgumentInvalidException('Complaint sender and complaint recipient cannot be the same');
    }
  }
}
