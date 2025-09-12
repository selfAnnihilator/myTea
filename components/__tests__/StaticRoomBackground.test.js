// components/__tests__/StaticRoomBackground.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import StaticRoomBackground from '../StaticRoomBackground';

describe('StaticRoomBackground', () => {
  test('renders the background container', () => {
    render(<StaticRoomBackground />);
    
    const backgroundElement = screen.getByTestId('static-room-background');
    expect(backgroundElement).toBeInTheDocument();
  });

  test('has correct CSS classes for styling', () => {
    render(<StaticRoomBackground />);
    
    const backgroundElement = screen.getByTestId('static-room-background');
    expect(backgroundElement).toHaveClass('fixed', 'inset-0', 'overflow-hidden');
  });
});