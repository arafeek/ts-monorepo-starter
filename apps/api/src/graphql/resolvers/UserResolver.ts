import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { eq } from 'drizzle-orm';

import { User } from '../types/User';
import { Context } from '../context';
import { users } from '../../db/schema';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.user) {
      return null;
    }

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);

    return user || null;
  }

  @Authorized()
  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    return ctx.db.select().from(users);
  }
}