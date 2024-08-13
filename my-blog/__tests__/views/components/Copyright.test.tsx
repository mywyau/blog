import React from 'react';
import { render, screen } from '@testing-library/react';
import Copyright from '../../../src/views/components/Copyright';



describe('Copyright component', () => {
  test('renders copyright text', () => {
    render(<Copyright />);
    const copyrightText = screen.getByText(/© 2024 My Blog. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders Privacy Policy link', () => {
    render(<Copyright />);
    const privacyPolicyLink = screen.getByText(/Privacy Policy/i);
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');
  });

  test('renders Terms of Service link', () => {
    render(<Copyright />);
    const termsOfServiceLink = screen.getByText(/Terms of Service/i);
    expect(termsOfServiceLink).toBeInTheDocument();
    expect(termsOfServiceLink).toHaveAttribute('href', '/terms-of-service');
  });

  test('has the correct class names', () => {
    render(<Copyright />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('w-full', 'font-nunito', 'bg-true-blue', 'text-white', 'py-1', 'fixed', 'bottom-0');
  });

  test('renders with responsive padding', () => {
    render(<Copyright />);
    const containerDiv = screen.getByText(/© 2024 My Blog. All rights reserved./i).parentElement;
    expect(containerDiv).toHaveClass('container', 'mx-auto', 'text-center', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  test('renders with correct text size', () => {
    render(<Copyright />);
    const paragraphElement = screen.getByText(/© 2024 My Blog. All rights reserved./i);
    expect(paragraphElement).toHaveClass('text-xs', 'xs:text-base');
  });

  test('links have the correct classes', () => {
    render(<Copyright />);
    const privacyPolicyLink = screen.getByText(/Privacy Policy/i);
    const termsOfServiceLink = screen.getByText(/Terms of Service/i);

    expect(privacyPolicyLink).toHaveClass('text-white', 'underline', 'hover:text-gray-300', 'ml-2', 'sm:ml-4', 'sm:mr-2');
    expect(termsOfServiceLink).toHaveClass('text-white', 'underline', 'hover:text-gray-300', 'ml-2');
  });
});
