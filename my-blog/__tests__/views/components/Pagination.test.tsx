import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../src/views/components/Pagination';

describe('Pagination Component', () => {
  it('renders the correct number of page buttons', () => {
    render(<Pagination postsPerPage={10} totalPosts={50} paginate={jest.fn()} />);
    
    // We expect 5 buttons (since 50 / 10 = 5)
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(5);
  });

  it('renders the correct page numbers', () => {
    render(<Pagination postsPerPage={10} totalPosts={30} paginate={jest.fn()} />);
    
    // Page numbers should be 1, 2, 3 (since 30 / 10 = 3)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls paginate function with correct page number when a button is clicked', () => {
    const mockPaginate = jest.fn();
    render(<Pagination postsPerPage={10} totalPosts={30} paginate={mockPaginate} />);
    
    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  it('renders buttons with correct styles', () => {
    render(<Pagination postsPerPage={10} totalPosts={20} paginate={jest.fn()} />);
    
    const pageButton = screen.getByText('1');
    expect(pageButton).toHaveClass('bg-blue-500');
    expect(pageButton).toHaveClass('text-white');
    expect(pageButton).toHaveClass('px-3');
    expect(pageButton).toHaveClass('py-1');
    expect(pageButton).toHaveClass('rounded');
  });
});
