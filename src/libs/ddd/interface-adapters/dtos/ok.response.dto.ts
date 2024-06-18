import { Field, ObjectType } from '@nestjs/graphql';

export interface BaseOkProps {
  ok: boolean;
}

@ObjectType()
export class OkResponse {
  constructor(props: BaseOkProps = { ok: false }) {
    this.ok = props.ok;
  }

  @Field(() => Boolean, { defaultValue: false })
  readonly ok: boolean;
}
