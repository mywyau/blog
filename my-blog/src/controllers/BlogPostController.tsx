import UseBlogPost from '../hooks/UseBlogPost';
import BlogPostPage from '../views/blog/BlogPostPage';


const BlogPostController: React.FC = () => {

    const { post, loading, errorMessage } = UseBlogPost();

    return (
        <BlogPostPage post={post} loading={loading} errorMessage={errorMessage} />
    );
};

export default BlogPostController;
