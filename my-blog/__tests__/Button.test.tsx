import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../src/views/components/buttons/Button';

describe('Button component', () => {
  it('renders a Primary button with default styles', () => {
    render(<Button>Primary Button</Button>);
    const buttonElement = screen.getByText('Primary Button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-true-blue');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('hover:bg-blue-500');
  });

  it('renders a Secondary button with secondary styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByText('Secondary Button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-cardinal');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('hover:bg-true-blue');
  });

  it('renders a Danger button with danger styles', () => {
    render(<Button variant="danger">Danger Button</Button>);
    const buttonElement = screen.getByText('Danger Button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-true-blue');
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('hover:bg-cardinal');
  });

  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText('Click me');

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and cannot be clicked when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText('Disabled Button');

    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('has a basis-1/4 styling', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText('Test Button');
    const wrapperDiv = buttonElement.closest('div'); // Select the closest div containing the button

    expect(wrapperDiv).toHaveClass('basis-1/4');
  });
});
