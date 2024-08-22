import { render, screen } from '@testing-library/react';
import { fold, getOrElse, isSome, none, Option, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import BlogPostController from '../../src/controllers/BlogPostController';

// Mock the useBlogPost hook
jest.mock('../../src/controllers/hooks/useBlogPost', () => ({
    useBlogPost: jest.fn(),
}));


// jest.mock('../../src/views/blog/BlogPostPage', () => {
//     // Wrapping fp-ts utilities inside the mock to avoid out-of-scope error
//     return {
//         __esModule: true,
//         default: jest.fn(({ post, loading, errorMessage }: { post: Option<any>; loading: Option<boolean>; errorMessage: Option<string>; }) => {
//             if (pipe(loading, getOrElse(() => false))) {
//                 return <div>Loading...</div>;
//             }
//             if (pipe(errorMessage, isSome)) {
//                 return <div>{pipe(errorMessage, getOrElse(() => ''))}</div>;
//             }
//             return pipe(
//                 post,
//                 fold(
//                     () => <div>BlogPostPage Component</div>,
//                     (postData) => <div>{postData.title}</div>
//                 )
//             );
//         }),
//     };
// });

jest.mock('../../src/views/blog/BlogPostPage', () => ({
    __esModule: true,
    default: MockBlogPostPage,
}));

const MockBlogPostPage = ({ post, loading, errorMessage }: { post: Option<any>; loading: Option<boolean>; errorMessage: Option<string>; }) => {
    if (pipe(loading, getOrElse(() => false))) {
        return <div>Loading...</div>;
    }
    if (pipe(errorMessage, isSome)) {
        return <div>{pipe(errorMessage, getOrElse(() => ''))}</div>;
    }
    return pipe(
        post,
        fold(
            () => <div>BlogPostPage Component</div>,
            (postData) => <div>{postData.title}</div>
        )
    );
};


// Mock the BlogPostPage component
// jest.mock('../../src/views/blog/BlogPostPage', () => jest.fn(() => <div>BlogPostPage Component</div>));

describe('BlogPostController', () => {

    const mockUseBlogPost = require('../../src/controllers/hooks/useBlogPost').useBlogPost;

    it('should render loading state', () => {

        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(true),
            errorMessage: none,
        });

        render(<BlogPostController />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error message when there is an error', () => {
        mockUseBlogPost.mockReturnValue({
            post: none,
            loading: some(false),
            errorMessage: some('Error occurred'),
        });

        render(<BlogPostController />);

        expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    it('should render BlogPostPage component with post title', () => {

        const mockPost = { id: 1, post_id: 'test-id', title: 'Test Title', body: 'Test Body' };
        mockUseBlogPost.mockReturnValue({
            post: some(mockPost),
            loading: some(false),
            errorMessage: none,
        });

        render(<BlogPostController />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});
