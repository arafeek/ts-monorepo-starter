import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HomePage } from '../pages/HomePage';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  it('renders the main heading', () => {
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <HomePage />
      </Wrapper>
    );

    expect(screen.getByRole('heading', { name: /typescript monorepo starter/i })).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <HomePage />
      </Wrapper>
    );

    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <HomePage />
      </Wrapper>
    );

    expect(screen.getByText(/fast setup/i)).toBeInTheDocument();
    expect(screen.getByText(/modern stack/i)).toBeInTheDocument();
    expect(screen.getByText(/authentication ready/i)).toBeInTheDocument();
  });
});