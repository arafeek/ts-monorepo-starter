export const APP_NAME = 'TypeScript Monorepo Starter';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    SIGNOUT: '/auth/signout',
    SESSION: '/auth/session',
  },
  GRAPHQL: '/graphql',
} as const;

export const QUERY_KEYS = {
  AUTH: ['auth'],
  USER: ['user'],
  SESSION: ['auth', 'session'],
} as const;

export const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const DEFAULT_CACHE_TIME = 10 * 60 * 1000; // 10 minutes