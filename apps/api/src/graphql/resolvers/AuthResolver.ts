import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { auth } from '@/auth/config';
import { Context } from '../context';
import { AuthSession, SignInInput, SignUpInput } from '../types/Auth';

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

      if (result.token && result.user) {
        return {
          user: result.user,
          sessionToken: result.token,
        };
      } else {
        throw new Error('Sign up failed');
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Sign up failed'
      );
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

      return {
        user: result.user,
        sessionToken: result.token,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Sign in failed'
      );
    }
  }
}
