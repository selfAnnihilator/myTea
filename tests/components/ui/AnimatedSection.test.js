// components/__tests__/AnimatedSection.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedSection from '../../../src/components/ui/AnimatedSection';

// Mock the useOnScreen hook to avoid IntersectionObserver issues
jest.mock('../../../src/hooks/useOnScreen', () => ({
  useOnScreen: () => [true]
}));

describe('AnimatedSection', () => {
  test('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div>Test Child</div>
      </AnimatedSection>
    );
    
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });
});