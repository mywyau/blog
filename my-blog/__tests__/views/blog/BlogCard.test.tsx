import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogCard from '../../../src/views/blog/BlogCard';
import { PostData } from '../../../src/models/PostData';


describe('BlogCard', () => {
    
    const mockPost: PostData = {
        id: 1,
        post_id: 'test-post-id',
        title: 'Test Post',
        body: 'This is a test post body that is longer than 100 words. '.repeat(10),
    };

    test('renders the title and body correctly', () => {
        render(
            <MemoryRouter>
                <BlogCard {...mockPost} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText(/This is a test post body/)).toBeInTheDocument();
    });

    test('renders a "Read more" link with the correct post ID', () => {
        render(
            <MemoryRouter>
                <BlogCard {...mockPost} />
            </MemoryRouter>
        );

        const readMoreLink = screen.getByText('Read more');
        expect(readMoreLink).toBeInTheDocument();
        expect(readMoreLink).toHaveAttribute('href', `/post/${mockPost.post_id}`);
    });

    test('selects text within the component when Command + A is pressed', () => {
        render(
            <MemoryRouter>
                <BlogCard {...mockPost} />
            </MemoryRouter>
        );

        const textElement = screen.getByText(/This is a test post body/);
        textElement.focus();

        fireEvent.keyDown(textElement, { key: 'a', metaKey: true });

        const selection = window.getSelection();
        expect(selection?.toString()).toBe(textElement.textContent);
    });

    test('selects text within the component when Control + A is pressed', () => {
        render(
            <MemoryRouter>
                <BlogCard {...mockPost} />
            </MemoryRouter>
        );

        const textElement = screen.getByText(/This is a test post body/);
        textElement.focus();

        fireEvent.keyDown(textElement, { key: 'a', ctrlKey: true });

        const selection = window.getSelection();
        expect(selection?.toString()).toBe(textElement.textContent);
    });
});
