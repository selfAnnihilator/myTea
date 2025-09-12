// components/__tests__/ArticleCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../ArticleCard';

describe('ArticleCard', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    imageUrl: 'https://example.com/image.jpg',
    publisher: 'Test Publisher',
    sourceUrl: 'https://example.com/article',
    overview: 'This is a test article overview.',
    category: 'Technology'
  };

  test('renders article title', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const titleElement = screen.getByText('Test Article');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders article image with correct src and alt', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const imageElement = screen.getByAltText('Test Article');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders publisher name', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const publisherElement = screen.getByText('Test Publisher');
    expect(publisherElement).toBeInTheDocument();
  });

  test('renders article overview', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const overviewElement = screen.getByText('This is a test article overview.');
    expect(overviewElement).toBeInTheDocument();
  });

  test('has link to source URL', () => {
    render(<ArticleCard article={mockArticle} />);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com/article');
  });
});