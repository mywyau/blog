import React, { useState } from 'react';
import { PostData } from '../../models/PostData';
import BlogList from '../blog/BlogList';
import DeleteAllButton from '../components/buttons/DeleteAllButton';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Pagination from '../components/Pagination';

interface LandingPageProps {
  posts: PostData[];
  errorMessage: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ posts, errorMessage }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const [post, setPost] = useState<PostData[]>(posts);

  return (
    <div className="font-nunito min-h-screen bg-gray-100">
      <header className="">
        <Navbar />
      </header>
      <main className="container mx-auto p-10">

        {/* {loading && <p>Loading...</p>} */}
        {errorMessage && <p className='text-xl text-purple-800'>Error: {errorMessage}</p>}

        <div className="flex flex-grow container mx-auto font-nunito min-h-screen bg-gray-100">
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
            <BlogList posts={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <div className="pt-4 sm:p-4">
            <DeleteAllButton posts={post} setPosts={setPost} />
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
