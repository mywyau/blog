import React, { useState } from 'react';
import BlogList from '../blog/BlogList';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Pagination from '../components/Pagination';
import Title from '../components/title/Title';
import { PostData } from '../../models/PostData';

interface BlogListProps {
  posts: PostData[];
}

const LandingPage: React.FC<BlogListProps> = ({posts}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="font-nunito min-h-screen bg-cambridge-blue">
      <header className="py-4">
        <Navbar />
      </header>
      <main className="container mx-auto p-10">
        <BlogList posts={currentPosts} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </main>
      <footer className="mt-auto">
        <Copyright />
      </footer>
    </div>
  );
};

export default LandingPage;
