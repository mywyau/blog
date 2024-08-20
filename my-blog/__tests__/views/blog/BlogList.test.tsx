import { render, screen } from '@testing-library/react';
import BlogCard from '../../../src/views/blog/BlogCard';
import BlogList from '../../../src/views/blog/BlogList';
import { PostData } from '../../../src/models/PostData';

// Mocking BlogCard component
jest.mock('../../../src/views/blog/BlogCard', () => {
    return jest.fn(() => <div>BlogCard Component</div>);
});

describe('BlogList component', () => {

    const samplePosts: PostData[] = [
        { id: 1, post_id: "blog-post-1", title: 'Post 1', body: 'Content for post 1' },
        { id: 2, post_id: "blog-post-2", title: 'Post 2', body: 'Content for post 2' },
        { id: 3, post_id: "blog-post-3", title: 'Post 3', body: 'Content for post 3' },
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
                    post_id: post.post_id,
                    title: post.title,
                    body: post.body, 
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
