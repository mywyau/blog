import { render, screen } from '@testing-library/react';
import BlogCard from '../src/views/blog/BlogCard';
import BlogList from '../src/views/components/BlogList';

// Mocking BlogCard component
jest.mock('../src/views/blog/BlogCard', () => {
    return jest.fn(() => <div>BlogCard Component</div>);
});

describe('BlogList component', () => {
    const samplePosts = [
        { id: 1, title: 'Post 1', content: 'Content for post 1' },
        { id: 2, title: 'Post 2', content: 'Content for post 2' },
    ];

    test('renders without crashing', () => {
        render(<BlogList posts={samplePosts} />);
    });

    test('renders a list of BlogCard components', () => {

        render(<BlogList posts={samplePosts} />);

        const blogCardElements = screen.getAllByText('BlogCard Component');
        expect(blogCardElements.length).toBe(samplePosts.length);
    });

    test('passes correct props to BlogCard components', () => {
        render(<BlogList posts={samplePosts} />);

        // Check if BlogCard is called with correct props
        samplePosts.forEach(post => {
            expect(BlogCard).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: post.id,
                    title: post.title,
                    excerpt: post.content,
                }),
                {}
            );
        });
    });

    test('renders the correct number of BlogCard components', () => {
        render(<BlogList posts={samplePosts} />);

        const blogCardElements = screen.getAllByText('BlogCard Component');
        expect(blogCardElements.length).toBe(samplePosts.length);
    });
});
