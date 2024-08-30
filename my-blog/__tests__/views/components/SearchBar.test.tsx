// __tests__/SearchBar.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../src/views/components/SearchBar';

describe('SearchBar Component', () => {
  const setup = () => {
    const setSearchQuery = jest.fn();
    const utils = render(<SearchBar searchQuery="" setSearchQuery={setSearchQuery} />);
    const input = screen.getByPlaceholderText('Search blog posts...');
    return {
      input,
      setSearchQuery,
      ...utils,
    };
  };

  it('renders the input field correctly', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('calls setSearchQuery on input change', () => {
    const { input, setSearchQuery } = setup();
    fireEvent.change(input, { target: { value: 'React' } });
    expect(setSearchQuery).toHaveBeenCalledWith('React');
  });

  it('displays the clear button when searchQuery is not empty', () => {
    render(<SearchBar searchQuery="React" setSearchQuery={jest.fn()} />);
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('does not display the clear button when searchQuery is empty', () => {
    const { queryByRole } = render(<SearchBar searchQuery="" setSearchQuery={jest.fn()} />);
    const clearButton = queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('calls setSearchQuery with an empty string when clear button is clicked', () => {
    const setSearchQuery = jest.fn();
    render(<SearchBar searchQuery="React" setSearchQuery={setSearchQuery} />);
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    expect(setSearchQuery).toHaveBeenCalledWith('');
  });
});
