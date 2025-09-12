// components/__tests__/HeroSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  test('renders the heading', () => {
    render(<HeroSection />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the paragraph', () => {
    render(<HeroSection />);
    const paragraphElement = screen.getByText(/freshly curated articles and stories/i);
    expect(paragraphElement).toBeInTheDocument();
  });
});