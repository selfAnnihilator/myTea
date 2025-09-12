// components/__tests__/CustomCursor.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomCursor from '../CustomCursor';

// Mock mouse move events
describe('CustomCursor', () => {
  beforeEach(() => {
    // Reset mouse position
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    });
  });

  test('renders the custom cursor element', () => {
    render(<CustomCursor />);
    
    const cursorElement = screen.getByTestId('custom-cursor');
    expect(cursorElement).toBeInTheDocument();
  });
});