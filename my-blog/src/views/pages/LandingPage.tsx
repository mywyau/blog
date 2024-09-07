import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { default as UserType, default as UserTypes } from '../../models/ADTs/UserType';
import { PostData } from '../../models/PostData';
import AuthService from '../../service/AuthService';
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

  const [userRole, setUserRole] = useState<UserType | null>(null); // State to track user role
  // const [loadingUserRole, setLoadingUserRole] = useState<boolean>(true); // Track loading state

  // Fetch user role with a slight delay for smoother transitions
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AuthService.getRole();
        setUserRole(role);

      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, []); // Empty dependency array means this effect runs once on mount

  function renderLoggedInContent(): JSX.Element {
    
    if (userRole === UserTypes.Admin) {
      return (
        <div>
          <p className="text-lg text-purple-400 text-right">Logged in as Admin</p>
        </div>
      );
    } else if (userRole === UserTypes.Viewer) {
      return (
        <div>
          <p className="text-lg text-purple-400 text-right">Logged in as Viewer</p>
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }

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

            {renderLoggedInContent()}

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
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
