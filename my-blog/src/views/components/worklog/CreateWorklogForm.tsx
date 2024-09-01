import axios from 'axios';
import React, { useState } from 'react';
import { WorkLogData } from '../../../models/WorkLogData';


const CreateWorklogForm: React.FC = () => {

  const [id, setId] = useState(0);
  const [worklog_id, setWorklogId] = useState('');
  const [worklog_name, setWorklogName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const maxWorklogNameLength = 100;
  const maxWorklogIdLength = 50;
  const maxContentLength = 5000;

  const createPost = async () => {
    if (worklog_name.trim() === '' || content.trim() === '') {
      alert('worklog Name and content cannot be empty');
      return;
    }

    const worklogData: WorkLogData = {
      id: id,
      worklog_id: worklog_id,
      work_title: worklog_name,
      body: content,
      created_at: new Date(),
      updated_at: new Date()
    };

    setIsLoading(true);
    try {
      const response = await axios.post(API_BASE_URL + '/blog/worklog/create', worklogData);
      console.log('Post created successfully:', response.data);
      setWorklogName('');
      setWorklogId('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`[worklogCreator][axios.post] Failed to create the post. Please try again. ${API_BASE_URL}/blog/worklog/create`);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingworklog_nameChars = maxWorklogNameLength - worklog_name.length;
  const remainingPostIdChars = maxWorklogIdLength - worklog_id.length;
  const remainingContentChars = maxContentLength - content.length;

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div className="mb-4">
          <label className="block mb-2">
            Work Title:
            <input
              type="text"
              value={worklog_name}
              onChange={(e) => setWorklogName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxWorklogNameLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingworklog_nameChars} characters remaining
          </p>
        </div>
        <div>
          <label className="block mb-2">
            Worklog ID:
            <input
              type="text"
              value={worklog_id}
              onChange={(e) => setWorklogId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxWorklogIdLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingPostIdChars} characters remaining
          </p>
        </div>
        <div className="mt-4 mb-4">
          <label className="block mb-2">
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 border border-gray-300 rounded p-2"
              maxLength={maxContentLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingContentChars} characters remaining
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
        >
          {isLoading ? 'Creating...' : 'Create worklog'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorklogForm;
