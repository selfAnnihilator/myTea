// components/__tests__/Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock the gsap library
jest.mock('gsap', () => ({
  timeline: jest.fn().mockReturnValue({
    to: jest.fn().mockReturnThis(),
    play: jest.fn(),
    reverse: jest.fn(),
    kill: jest.fn(),
    eventCallback: jest.fn()
  }),
  set: jest.fn()
}));

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
      },
      {
        label: 'Articles',
        bgColor: '#e0e0e0',
        textColor: '#000',
        links: [
          { label: 'View Latest', href: '#articles', ariaLabel: 'View the latest articles' }
        ]
      }
    ],
    baseColor: '#fff',
    menuColor: '#000',
    buttonBgColor: '#111',
    buttonTextColor: '#fff'
  };

  test('renders the logo with alt text', () => {
    render(<Navbar {...mockProps} />);
    const logoElement = screen.getByAltText('Test Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'test-logo-url');
  });

  test('renders navigation items', () => {
    render(<Navbar {...mockProps} />);
    const homeLink = screen.getByText('Home');
    const articlesLink = screen.getByText('Articles');
    expect(homeLink).toBeInTheDocument();
    expect(articlesLink).toBeInTheDocument();
  });

  test('renders the Get Started button', () => {
    render(<Navbar {...mockProps} />);
    const buttonElement = screen.getByText('Get Started');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('card-nav-cta-button');
  });

  test('has hamburger menu', () => {
    render(<Navbar {...mockProps} />);
    const hamburgerMenu = screen.getByRole('button', { name: 'Open menu' });
    expect(hamburgerMenu).toBeInTheDocument();
    expect(hamburgerMenu).toHaveClass('hamburger-menu');
  });

  test('renders MyTea text', () => {
    render(<Navbar {...mockProps} />);
    const myTeaText = screen.getByText('MyTea');
    expect(myTeaText).toBeInTheDocument();
  });
});