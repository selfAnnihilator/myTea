// components/__tests__/Navbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  const mockProps = {
    logo: 'test-logo-url',
    logoAlt: 'Test Logo',
    items: [
      {
        label: 'Home',
        bgColor: '#f0f0f0',
        textColor: '#000',
        links: [
          { label: 'Top of Page', href: '#', ariaLabel: 'Go to the top of the page' }
        ]
      }
    ],
    baseColor: '#fff',
    menuColor: '#000',
    buttonBgColor: '#111',
    buttonTextColor: '#fff'
  };

  test('renders the logo', () => {
    render(<Navbar {...mockProps} />);
    const logoElement = screen.getByAltText('Test Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation items', () => {
    render(<Navbar {...mockProps} />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });
});