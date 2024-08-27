// __tests__/DeleteBlogPostButton.test.tsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { some, none } from 'fp-ts/Option';
import DeleteBlogPostButton from '../../../../src/views/components/buttons/DeleteBlogPostButton';
import { DeleteResponseBody } from '../../../../src/models/DeleteResponseBody';


describe('DeleteBlogPostButton Component', () => {
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button and call handleDelete on submit', () => {
    render(
      <DeleteBlogPostButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const button = screen.getByText('Delete this blog post');
    fireEvent.click(button);

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it('should disable the button when loading is true', () => {
    render(
      <DeleteBlogPostButton
        handleDelete={mockHandleDelete}
        loading={some(true)}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const button = screen.getByText('Delete this blog post');
    expect(button).toBeDisabled();
  });

  it('should display an error message if errorMessage is provided', () => {
    render(
      <DeleteBlogPostButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={some('Error deleting the post')}
        deleteResponseBody={none}
      />
    );

    expect(screen.getByText('Error deleting the post')).toBeInTheDocument();
  });

  it('should render the delete response body if deleteResponseBody is provided', () => {
    const mockResponseBody: DeleteResponseBody = { message: 'Post deleted successfully' };

    render(
      <DeleteBlogPostButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={some(mockResponseBody)}
      />
    );

    expect(screen.getByText('Post deleted successfully')).toBeInTheDocument();
  });

  it('should not display anything when errorMessage and deleteResponseBody are none', () => {
    render(
      <DeleteBlogPostButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    expect(screen.queryByText('Error deleting the post')).not.toBeInTheDocument();
    expect(screen.queryByText('Post deleted successfully')).not.toBeInTheDocument();
  });
});
