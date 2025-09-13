// components/__tests__/ArticlesSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesSection from '../../../src/components/sections/ArticlesSection';

// Mock the hooks and services used by ArticlesSection
jest.mock('../../../src/hooks/useOnScreen', () => ({
  useOnScreen: () => [false]
}));

jest.mock('../../../src/services/newsService', () => ({
  fetchArticles: jest.fn()
}));

describe('ArticlesSection', () => {
  test('renders the section heading', () => {
    render(<ArticlesSection />);
    const headingElement = screen.getByText('Latest Articles');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(<ArticlesSection />);
    const descriptionElement = screen.getByText('Discover what\'s happening around the world.');
    expect(descriptionElement).toBeInTheDocument();
  });
});