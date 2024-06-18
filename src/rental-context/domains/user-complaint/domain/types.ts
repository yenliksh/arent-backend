import { registerEnumType } from '@nestjs/graphql';

export enum UserComplaintType {
  I_THINK_THEY_ARE_DECEIVING = 'I_THINK_THEY_ARE_DECEIVING',
  THIS_USER_IS_BEHAVING_INDECENTLY = 'THIS_USER_IS_BEHAVING_INDECENTLY',
  THIS_IS_SPAM = 'THIS_IS_SPAM',
  OTHER = 'OTHER',
}

registerEnumType(UserComplaintType, {
  name: 'UserComplaintType',
});
