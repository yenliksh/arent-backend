import { registerEnumType } from '@nestjs/graphql';

export enum AdComplaintType {
  THERE_IS_AN_ERROR_IN_THE_AD = 'THERE_IS_AN_ERROR_IN_THE_AD',
  THIS_PLACE_DOES_NOT_EXIST = 'THIS_PLACE_DOES_NOT_EXIST',
  THIS_IS_A_FRAUD = 'THIS_IS_A_FRAUD',
  OBSCENE_CONTENT = 'OBSCENE_CONTENT',
  OTHER = 'OTHER',
}

registerEnumType(AdComplaintType, {
  name: 'AdComplaintType',
});
