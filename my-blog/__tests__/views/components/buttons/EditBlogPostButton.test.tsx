// __tests__/EditBlogPostButton.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditBlogPostButton from '../../../../src/views/components/buttons/EditBlogPostButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('EditBlogPostButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Edit button with the correct link based on postId', () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: '123' });
    (require('react-router-dom').useParams as jest.Mock).mockImplementation(useParamsMock);

    render(
      <MemoryRouter>
        <EditBlogPostButton />
      </MemoryRouter>
    );

    const editBlogPostButton = screen.getByText('Edit');
    expect(editBlogPostButton).toBeInTheDocument();
    expect(editBlogPostButton).toHaveAttribute('href', '/edit-blog-post/123');
  });

  it('should use default post id when id param is not provided', () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: undefined });
    (require('react-router-dom').useParams as jest.Mock).mockImplementation(useParamsMock);

    render(
      <MemoryRouter>
        <EditBlogPostButton />
      </MemoryRouter>
    );

    const editBlogPostButton = screen.getByText('Edit');
    expect(editBlogPostButton).toBeInTheDocument();
    expect(editBlogPostButton).toHaveAttribute('href', '/edit-blog-post/default-post-id');
  });

  it('should apply the correct classes to the link', () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: '123' });
    (require('react-router-dom').useParams as jest.Mock).mockImplementation(useParamsMock);

    render(
      <MemoryRouter>
        <EditBlogPostButton />
      </MemoryRouter>
    );

    const editBlogPostButton = screen.getByText('Edit');
    expect(editBlogPostButton).toHaveClass('inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-gradient-to-r from-info-start to-info-end text-white hover:animate-light-up');
  });
});
