import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';

const BlogCard: React.FC<PostData> = ({ id, post_id, title, body, created_at, updated_at }) => {
  const textCountHelper = TextCountHelper;

  const selectText = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges(); // Clear any existing selection
      selection.addRange(range); // Select the text inside the element
    }
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent, ref: React.RefObject<HTMLElement>) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
        event.preventDefault();
        if (ref.current) {
          selectText(ref.current);
        }
      }
    };

    const titleElement = titleRef.current;
    const textElement = textRef.current;

    const handleTitleKeyDown = (event: KeyboardEvent) => handleKeyDown(event, titleRef);
    const handleTextKeyDown = (event: KeyboardEvent) => handleKeyDown(event, textRef);

    if (titleElement) {
      titleElement.addEventListener('keydown', handleTitleKeyDown);
    }

    if (textElement) {
      textElement.addEventListener('keydown', handleTextKeyDown);
    }

    return () => {
      if (titleElement) {
        titleElement.removeEventListener('keydown', handleTitleKeyDown);
      }
      if (textElement) {
        textElement.removeEventListener('keydown', handleTextKeyDown);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 id={`h2-${title.replaceAll(" ", "-")}`} ref={titleRef} tabIndex={0} className="text-2xl font-bold mb-2">
        <Link id={`${title.replaceAll(" ", "-")}-link`} to={`/post/${post_id}`} className="text-green-500 hover:underline">
          {title}
        </Link>
      </h2>
      <p ref={textRef} tabIndex={0} className="text-gray-700">
        {textCountHelper.takeNumberOfWords(body, 100)}
      </p>
      <Link to={`/post/${post_id}`} id={`read-more-${post_id}`} className="text-azure hover:underline mt-4 inline-block">
        Read more
      </Link>
    </div>
  );
};

export default BlogCard;
