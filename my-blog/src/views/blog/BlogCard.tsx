// src/components/BlogCard.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';


const BlogCard: React.FC<PostData> = ({ id, post_id, title, body }) => {

  const textCountHelper = TextCountHelper

  const selectText = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges(); // Clear any existing selection
      selection.addRange(range); // Select the text inside the element
    }
  };

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Command (Mac) or Control (Windows/Linux) + A is pressed
      if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
        event.preventDefault(); // Prevent the default "select all" behavior
        if (textRef.current) {
          selectText(textRef.current); // Select the text inside the component
        }
      }
    };

    const element = textRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link to={`/post/${post_id}`} className="text-green-500 hover:underline">
          {title}
        </Link>
      </h2>
      <p ref={textRef} tabIndex={0} className="text-gray-700">{textCountHelper.takeNumberOfWords(body, 100)}</p>
      <Link to={`/post/${post_id}`} id={`read-more-${post_id}`} className="text-azure hover:underline mt-4 inline-block">
        Read more
      </Link>
    </div>
  );
};

export default BlogCard;
