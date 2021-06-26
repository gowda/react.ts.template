import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './app';

describe('App', () => {
  it('renders the message', () => {
    render(<App />);
    return expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
