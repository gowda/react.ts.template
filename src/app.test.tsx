import React, { ReactChildren, ReactElement } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { QueryClient, QueryClientProvider } from 'react-query';
import App from './app';

const queryClient = new QueryClient();

interface Props {
  children: ReactChildren;
}
const QueryClientProviderWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
const customRender = (ui: ReactElement, options: any = {}) =>
  render(ui, { wrapper: QueryClientProviderWrapper, ...options });

describe('App', () => {
  it('New todo form saves todo', () => {
    customRender(<App />);
    expect(
      screen.getByPlaceholderText('What needs to be done?')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('new-todo'), {
      target: { value: 'Test todo' },
    });
    fireEvent.keyPress(screen.getByTestId('new-todo'), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    return waitFor(() => screen.getByText('Test todo'));
  });
});
