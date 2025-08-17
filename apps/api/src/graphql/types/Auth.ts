import { ObjectType, Field, InputType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class AuthSession {
  @Field(() => User)
  user: User;

  @Field()
  sessionToken: string;
}

@InputType()
export class SignUpInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}