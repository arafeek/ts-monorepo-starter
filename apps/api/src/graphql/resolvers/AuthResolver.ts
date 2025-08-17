import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { AuthSession, SignUpInput, SignInInput } from '../types/Auth';
import { Context } from '../context';
import { auth } from '../../auth/config';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthSession, { nullable: true })
  async signUp(
    @Arg('input') input: SignUpInput,
    @Ctx() ctx: Context
  ): Promise<AuthSession | null> {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      });

      if (result.error || !result.data) {
        throw new Error(result.error?.message || 'Sign up failed');
      }

      return {
        user: result.data.user,
        sessionToken: result.data.session.token,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign up failed');
    }
  }

  @Mutation(() => AuthSession, { nullable: true })
  async signIn(
    @Arg('input') input: SignInInput,
    @Ctx() ctx: Context
  ): Promise<AuthSession | null> {
    try {
      const result = await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
      });

      if (result.error || !result.data) {
        throw new Error(result.error?.message || 'Sign in failed');
      }

      return {
        user: result.data.user,
        sessionToken: result.data.session.token,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign in failed');
    }
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() ctx: Context): Promise<boolean> {
    try {
      const result = await auth.api.signOut({});

      return !result.error;
    } catch (error) {
      return false;
    }
  }
}