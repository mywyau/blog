import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostCreator from '../../../src/views/components/PostCreator';
import { config } from 'dotenv';

config({ path: '../../.env' });

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(API_BASE_URL);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostCreator Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  it('renders the form fields correctly', () => {
    render(<PostCreator />);

    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post ID:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content:/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
  });

  it('displays the correct remaining character counts', () => {
    render(<PostCreator />);

    expect(screen.getByText(/100 characters remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/50 characters remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/20000 characters remaining/i)).toBeInTheDocument();
  });

  // TODO: clean up and remove or try to implement error summary as part of the dom/page not as an alert.
  // the error summary appears as an alert thus hard to test 
  // it('validates that title and content cannot be empty on submission', async () => {

  //   render(<PostCreator />);

  //   fireEvent.click(screen.getByText(/Create Post/i));

  //   await waitFor(() => {
  //     expect(mockedAxios.post).not.toHaveBeenCalled();
  //     expect(screen.getByText(/Title and content cannot be empty/i)).toBeInTheDocument();
  //   });
  // });

  it('submits the form when fields are filled', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        post_id: 'test-post',
        title: 'Test Title',
        body: 'Test Content',
      },
    });

    render(<PostCreator />);

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/Post ID:/i), {
      target: { value: 'test-post' },
    });
    fireEvent.change(screen.getByLabelText(/Content:/i), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByText(/Create Post/i));

    await waitFor(() => {
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        API_BASE_URL + '/blog/post/create',
        {
          id: 0,
          post_id: 'test-post',
          title: 'Test Title',
          body: 'Test Content',
        }
      );
    });

    expect(screen.getByLabelText(/Title:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Post ID:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Content:/i)).toHaveValue('');
  });

  // TODO: clean up and remove or try to implement error summary as part of the dom/page not as an alert.
  // it('displays an error alert if post creation fails', async () => {
  //   mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

  //   render(<PostCreator />);

  //   fireEvent.change(screen.getByLabelText(/Title:/i), {
  //     target: { value: 'Test Title' },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Post ID:/i), {
  //     target: { value: 'test-post' },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Content:/i), {
  //     target: { value: 'Test Content' },
  //   });

  //   fireEvent.click(screen.getByText(/Create Post/i));

  //   await waitFor(() => {
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(screen.getByText(/Failed to create the post. Please try again./i)).toBeInTheDocument();
  //   });
  // });

  it('displays "Creating..." while submitting', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        post_id: 'test-post',
        title: 'Test Title',
        body: 'Test Content',
      },
    });

    render(<PostCreator />);

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/Post ID:/i), {
      target: { value: 'test-post' },
    });
    fireEvent.change(screen.getByLabelText(/Content:/i), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByText(/Create Post/i));

    expect(screen.getByText(/Creating.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Creating.../i)).not.toBeInTheDocument();
    });
  });
});