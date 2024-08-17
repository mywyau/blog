import React, { useState } from 'react';
import BlogList from '../blog/BlogList';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Pagination from '../components/Pagination';
import Title from '../components/title/Title';

const LandingPage: React.FC = () => {
  // Sample data for demonstration
  const posts = [
    { id: 1, post_id: "mikey-1", title: 'Post 1', content: 'Content of post 1' },
    { id: 2, post_id: "mikey-2", title: 'Post 2', content: 'Content of post 2' },
    { id: 3, post_id: "mikey-3", title: 'Post 3', content: 'Content of post 3' },
    { id: 4, post_id: "mikey-4", title: 'Post 4', content: 'Content of post 4' },
    { id: 5, post_id: "mikey-5", title: 'Post 5', content: 'Content of post 5' },
    { id: 6, post_id: "mikey-6", title: 'Post 6', content: 'Content of post 6' },
    { id: 7, post_id: "mikey-7", title: 'Post 7', content: 'Content of post 7' },
    { id: 8, post_id: "mikey-8", title: 'Post 8', content: 'Content of post 8' },
    { id: 9, post_id: "mikey-9", title: 'Post 9', content: 'Content of post 9' },
    { id: 10, post_id: "mikey-10", title: 'Post 10', content: 'Content of post 10' },
  ];

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
