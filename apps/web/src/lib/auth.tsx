import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient, type User, type AuthResponse, type SignUpData, type SignInData } from './api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<AuthResponse>('/auth/session');
        setUser(response.data.user);
        return response.data;
      } catch (error) {
        setUser(null);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await apiClient.post<AuthResponse>('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['auth', 'session'], data);
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (data: SignInData) => {
      const response = await apiClient.post<AuthResponse>('/auth/signin', data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['auth', 'session'], data);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/signout');
    },
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
  });

  const signUp = async (data: SignUpData) => {
    await signUpMutation.mutateAsync(data);
  };

  const signIn = async (data: SignInData) => {
    await signInMutation.mutateAsync(data);
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
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