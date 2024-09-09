// LandingPage.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { PostData } from '../../../src/models/PostData';
import LandingPage from '../../../src/views/pages/LandingPage';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

const mockPosts: PostData[] = [
  {
    id: 1,
    post_id: 'First Post',
    title: 'First Post Title',
    body: 'This is the first post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    post_id: 'Second Post',
    title: 'Second Post Title',
    body: 'This is the second post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    post_id: 'Third Post',
    title: 'Third Post Title',
    body: 'This is the third post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    post_id: 'Fourth Post',
    title: 'Fourth Post Title',
    body: 'This is the fourth post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    post_id: 'Fifth Post',
    title: 'Fifth Post Title',
    body: 'This is the fifth post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    post_id: 'Sixth Post',
    title: 'Sixth Post Title',
    body: 'This is the sixth post.',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

describe('LandingPage', () => {
  // Reset mock after each test to ensure no interference
  afterEach(() => {
    mock.reset();
  });

  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <LandingPage posts={[]} errorMessage="" />
      </MemoryRouter>
    );
    expect(screen.getByText(/No blog posts found./i)).toBeInTheDocument();
  });

  test('displays a list of blog posts', () => {
    render(
      <MemoryRouter>
        <LandingPage posts={mockPosts} errorMessage="" />
      </MemoryRouter>
    );
    expect(screen.getByText(/First Post Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Fifth Post Title/i)).toBeInTheDocument();
  });

  test('filters blog posts by search query', () => {
    render(
      <MemoryRouter>
        <LandingPage posts={mockPosts} errorMessage="" />
      </MemoryRouter>
    );

    // Initially, there should be 6 posts
    expect(screen.getAllByText(/Title/i)).toHaveLength(5);

    // Filter by search query
    fireEvent.change(screen.getByPlaceholderText(/Search blog posts.../i), {
      target: { value: 'First' },
    });

    expect(screen.getByText(/First Post Title/i)).toBeInTheDocument();
    expect(screen.queryByText(/Second Post Title/i)).not.toBeInTheDocument();
  });

  test('displays no posts message when no posts match the search query', () => {
    render(
      <MemoryRouter>
        <LandingPage posts={mockPosts} errorMessage="" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search blog posts.../i), {
      target: { value: 'Nonexistent Post' },
    });

    expect(screen.getByText(/No blog posts found./i)).toBeInTheDocument();
  });

  test('paginates through posts', () => {
    render(
      <MemoryRouter>
        <LandingPage posts={mockPosts} errorMessage="" />
      </MemoryRouter>
    );

    // Initially, the first 5 posts should be visible
    expect(screen.getByText('First Post Title')).toBeInTheDocument();
    expect(screen.getByText('Fifth Post Title')).toBeInTheDocument();
    expect(screen.queryByText('Sixth Post Title')).not.toBeInTheDocument();


    // TODO: Fix or remove this
    fireEvent.click(screen.getByTestId('pagination-button-2'));

    // The sixth post should now be visible
    expect(screen.getByText('Sixth Post Title')).toBeInTheDocument();
    expect(screen.queryByText('First Post Title')).not.toBeInTheDocument();
  });
});
