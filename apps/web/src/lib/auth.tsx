import { createAuthClient } from 'better-auth/react';
import React, { createContext, useContext } from 'react';

import type { SignInData, SignUpData } from './api';

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

interface AuthContextType {
  user: any;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  useSession: typeof authClient.useSession;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  const signUp = async (data: SignUpData) => {
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  const signIn = async (data: SignInData) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
  };

  const signOut = async () => {
    await authClient.signOut();
  };

  const isAuthenticated = !!session?.user;

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        isLoading: isPending,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        useSession: authClient.useSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { authClient };
