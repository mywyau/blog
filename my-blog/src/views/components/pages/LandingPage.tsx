// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import BlogList from '../BlogList';
import Button from '../Button';
import Copyright from '../Copyright';
import Navbar from '../NavBar';
import Pagination from '../Pagination';
import PostButton from '../PostButton';
import Title from '../title/Title';


const LandingPage: React.FC = () => {
  // Sample data for demonstration
  const posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, title: 'Post 3', content: 'Content of post 3' },
    { id: 4, title: 'Post 4', content: 'Content of post 4' },
    { id: 5, title: 'Post 5', content: 'Content of post 5' },
    { id: 6, title: 'Post 6', content: 'Content of post 6' },
    { id: 7, title: 'Post 7', content: 'Content of post 7' },
    { id: 8, title: 'Post 8', content: 'Content of post 8' },
    { id: 9, title: 'Post 9', content: 'Content of post 9' },
    { id: 10, title: 'Post 10', content: 'Content of post 10' },
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
        <Title />
      </header>
      <main className="container mx-auto p-4">

        <BlogList posts={posts} />

        {
          /* {
            currentPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))
          } */
        }

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />

        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <PostButton />
        
      </main>
      <Copyright />
    </div>
  );
};

export default LandingPage;
