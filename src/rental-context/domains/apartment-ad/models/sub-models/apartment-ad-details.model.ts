import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

type ApartmentAdDetailsModelCreateProps = Required<Pick<ApartmentAdOrmEntity, 'numberOfGuests' | 'numberOfRooms'>>;

@ObjectType()
export class ApartmentAdDetailsModel {
  @Field(() => Int)
  numberOfGuests: number;

  @Field(() => Int)
  numberOfRooms: number;

  constructor(model: ApartmentAdDetailsModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdDetailsModelCreateProps) {
    return new ApartmentAdDetailsModel(props);
  }

  static getDetailsProps({
    numberOfGuests,
    numberOfRooms,
  }: Partial<ApartmentAdDetailsModelCreateProps>): ApartmentAdDetailsModelCreateProps | undefined {
    if (numberOfGuests == null || numberOfRooms == null) {
      return;
    }

    return {
      numberOfGuests,
      numberOfRooms,
    };
  }
}
