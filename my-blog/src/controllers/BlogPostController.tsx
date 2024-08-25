import BlogPostPage from '../views/blog/BlogPostPage';
import UseBlogPost from '../controllers/hooks/UseBlogPost';



const BlogPostController: React.FC = () => {

    const { post, loading, errorMessage } = UseBlogPost();

    return (
        <BlogPostPage post={post} loading={loading} errorMessage={errorMessage} />
    );
};

export default BlogPostController;
