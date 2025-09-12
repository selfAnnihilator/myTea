// components/__tests__/LoadingSpinner.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders the loading text', () => {
    render(<LoadingSpinner />);
    
    const textElement = screen.getByText('Brewing the freshest articles...');
    expect(textElement).toBeInTheDocument();
  });

  test('has correct CSS classes for styling', () => {
    render(<LoadingSpinner />);
    
    const containerElement = screen.getByRole('status');
    expect(containerElement).toHaveClass('flex', 'flex-col', 'justify-center', 'items-center');
  });
});