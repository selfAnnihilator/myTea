// components/__tests__/ErrorBoundary.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Mock console.error to prevent error logs in tests
console.error = jest.fn();

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  test('renders fallback UI when there is an error', () => {
    const BadComponent = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary>
        <BadComponent />
      </ErrorBoundary>
    );
    
    const errorElement = screen.getByText('Something went wrong');
    expect(errorElement).toBeInTheDocument();
  });

  test('calls console.error when an error occurs', () => {
    const errorMessage = 'Test error';
    const BadComponent = () => {
      throw new Error(errorMessage);
    };
    
    render(
      <ErrorBoundary>
        <BadComponent />
      </ErrorBoundary>
    );
    
    expect(console.error).toHaveBeenCalled();
  });

  test('renders custom fallback when provided', () => {
    const BadComponent = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary fallback={<div>Custom Error</div>}>
        <BadComponent />
      </ErrorBoundary>
    );
    
    const customErrorElement = screen.getByText('Custom Error');
    expect(customErrorElement).toBeInTheDocument();
  });
});