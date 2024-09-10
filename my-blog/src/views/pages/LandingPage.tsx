import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import NavbarPages from '../../models/ADTs/NavbarPages';
import { PostData } from '../../models/PostData';
import BlogList from '../blog/BlogList';
import DeleteAllBlogPostsButton from '../components/buttons/DeleteAllBlogPostsButton';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Spacer from '../components/Spacer';

interface LandingPageProps {
  posts: PostData[];
  errorMessage: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ posts, errorMessage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const [post, setPost] = useState<PostData[]>(posts); // Initialize posts state with the posts prop

  return (
    <div className="font-nunito min-h-screen bg-stone-300">
      <header>
        <Navbar page={NavbarPages.Home} />
      </header>
      <main className="container mx-auto p-10">
        <Spacer size="p-10" />
        {/* Search Bar */}
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex flex-grow container mx-auto font-nunito min-h-screen bg-stone-300">
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">

            {/* Render Blog Posts */}
            {currentPosts.length === 0 ? (
              <p className="text-center text-gray-500">No blog posts found.</p>
            ) : (
              <BlogList posts={currentPosts} />
            )}

            {/* Pagination */}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredPosts.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <div className="pt-4 sm:p-4">
            {/* Delete Blog Posts Button */}
            <DeleteAllBlogPostsButton posts={post} setPosts={setPost} />
          </div>
        </div>
      </main>
      <Copyright />
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
