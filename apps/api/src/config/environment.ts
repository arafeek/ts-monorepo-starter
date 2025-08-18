import z from 'zod';

const environmentConfig = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform(val => val.split(',')),
});

export const env = environmentConfig.parse(process.env);
