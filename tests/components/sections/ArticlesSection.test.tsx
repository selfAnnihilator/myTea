// components/__tests__/ArticlesSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesSection from '../ArticlesSection';

// Mock the hooks and services used by ArticlesSection
jest.mock('../../hooks/useOnScreen', () => ({
  useOnScreen: () => [false]
}));

jest.mock('../../services/newsService', () => ({
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