import { Either, fold } from 'fp-ts/lib/Either';
import { fold as optionFold } from 'fp-ts/lib/Option';
import { Option, none, some } from 'fp-ts/Option';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { default as UserTypes } from '../../models/ADTs/UserType';
import UserTypeErrors from '../../models/ADTs/UserTypeErrors';
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
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const [post, setPost] = useState<PostData[]>(posts); // Initialize posts state with the posts prop

  // const [userBasedContent, setUserBasedContent] = useState<Option<JSX.Element>>(none); // State to track user role

  // // Fetch user role when component mounts
  // useEffect(() => {
  //   const renderContent = async () => {
  //     const result: Either<UserTypeErrors, UserTypes> = await AuthService.getRole();

  //     fold<UserTypeErrors, UserTypes, void>(
  //       (error) => {
  //         switch (error) {
  //           case UserTypeErrors.UnknownUserType:
  //             setUserBasedContent(none); // No content for unknown user type
  //             break;
  //           default:
  //             setUserBasedContent(none); // No content for other errors
  //             break;
  //         }
  //       },
  //       (userType) => {
  //         switch (userType) {
  //           case UserTypes.Admin:
  //             setUserBasedContent(some(
  //               <div>
  //                 <p className="text-lg text-purple-400 text-right">Logged in as Admin</p>
  //               </div>
  //             ));
  //             break;
  //           case UserTypes.Viewer:
  //             setUserBasedContent(some(
  //               <div>
  //                 <p className="text-lg text-purple-400 text-right">Logged in as Viewer</p>
  //               </div>
  //             ));
  //             break;
  //           default:
  //             setUserBasedContent(none); // No content for other cases
  //             break;
  //         }
  //       }
  //     )(result);
  //   };

  //   renderContent(); // Invoke the function to fetch and set the content based on the user role
  // }, []); // Empty dependency array to run only on mount

  return (
    <div className="font-nunito min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto p-10">
        {/* Search Bar */}
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex flex-grow container mx-auto font-nunito min-h-screen bg-gray-100">
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">

            {/* {
              optionFold<JSX.Element, JSX.Element>(
                () => <></>, // Render nothing for the None case
                (content) => content // Render content for the Some case
              )(userBasedContent)
            } */}

            {/* Render Blog Posts */}
            {currentPosts.length === 0 ? (
              <p className="text-center text-gray-500">No blog posts found.</p>
            ) : (
              <BlogList posts={currentPosts} />
            )}

            {/* Render User Role Content */}


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
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
