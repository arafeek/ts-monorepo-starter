import { env } from './environment';

export const config = {
  ...env,
} as const;
