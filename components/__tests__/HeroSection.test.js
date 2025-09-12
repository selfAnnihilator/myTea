// components/__tests__/HeroSection.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

// Mock the useTypingEffect hook
jest.mock('../../hooks/useTypingEffect', () => ({
  useTypingEffect: (text) => text
}));

// Mock the AnimatedSection component
jest.mock('../AnimatedSection', () => {
  return ({ children, ...props }) => <div {...props}>{children}</div>;
});

describe('HeroSection', () => {
  test('renders the heading with typing effect text', () => {
    render(<HeroSection />);
    const headingElement = screen.getByText('Your Daily Brew of News');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the description paragraph', () => {
    render(<HeroSection />);
    const paragraphElement = screen.getByText(/Freshly curated articles and stories, served hot and ready for you/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('has correct CSS classes for styling', () => {
    render(<HeroSection />);
    const sectionElement = screen.getByRole('heading', { level: 1 }).closest('section');
    expect(sectionElement).toHaveClass('h-screen', 'w-full', 'flex', 'items-center', 'justify-center');
  });

  test('has cursor element', () => {
    render(<HeroSection />);
    const cursorElement = screen.getByText('|');
    expect(cursorElement).toBeInTheDocument();
  });
});