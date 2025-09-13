// components/__tests__/HeroSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../../src/components/sections/HeroSection';

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: jest.fn(),
  }));
});

afterAll(() => {
  // Clean up the mock
  // @ts-ignore
  delete global.IntersectionObserver;
});

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