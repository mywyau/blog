import React, { useState } from 'react';
import { PostData } from '../../models/PostData';
import BlogList from '../blog/BlogList';
import DeleteAllBlogPostsButton from '../components/buttons/DeleteAllBlogPostsButton';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

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
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfFirstPost + postsPerPage);

  const [post, setPost] = useState<PostData[]>(posts);

  return (
    <div className="font-nunito min-h-screen bg-gray-100">
      <header className="">
        <Navbar />
      </header>
      <main className="container mx-auto p-10">

        {/* Use the SearchBar component */}
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex flex-grow container mx-auto font-nunito min-h-screen bg-gray-100">
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">

            {currentPosts.length === 0 ? (
              <p className="text-center text-gray-500">No blog posts found.</p>
            ) : (
              <BlogList posts={currentPosts} />
            )}

            {/* {loading && <p>Loading...</p>} */}
            {errorMessage && <p className='text-lg text-center text-purple-800'>Error: {errorMessage}</p>}

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredPosts.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />

          </div>
        </div>

        <div className="flex justify-start">
          <div className="pt-4 sm:p-4">
            <DeleteAllBlogPostsButton posts={post} setPosts={setPost} />
          </div>
        </div>

      </main>
      <footer className="mt-auto">
        <Copyright />
      </footer>

    </div>
  );
};

export default LandingPage;
