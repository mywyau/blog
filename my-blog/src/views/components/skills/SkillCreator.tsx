import axios from 'axios';
import React, { useState } from 'react';
import { SkillData } from '../../../models/SkillData';


const SkillCreator: React.FC = () => {

  const [id, setId] = useState(0);
  const [skill_id, setSkillId] = useState('');
  const [skill_name, setSkillName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const maxSkillNameLength = 100;
  const maxSkillIdLength = 50;
  const maxContentLength = 400;

  const createSkill = async () => {
    if (skill_name.trim() === '' || content.trim() === '') {
      alert('Skill Name and content cannot be empty');
      return;
    }

    const skillData: SkillData = {
      id: id,
      skill_id: skill_id,
      skill_name: skill_name,
      body: content,
      created_at: new Date(),
      updated_at: new Date()
    };

    setIsLoading(true);
    try {
      const response = await axios.post(API_BASE_URL + '/blog/skill/create', 
        {
          ...skillData,
          created_at: skillData.created_at.toISOString(),
          updated_at: skillData.updated_at.toISOString(),
        }

      );
      console.log('Skill created successfully:', response.data);
      setSkillName('');
      setSkillId('');
      setContent('');
    } catch (error) {
      console.error('Error creating skill:', error);
      alert(`[SkillCreator][axios.post] Failed to create the skill. Please try again. ${API_BASE_URL}/blog/skill/create`);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingSkillNameChars = maxSkillNameLength - skill_name.length;
  const remainingSkillIdChars = maxSkillIdLength - skill_id.length;
  const remainingContentChars = maxContentLength - content.length;

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createSkill();
        }}
      >
        <div className="mb-4">
          <label className="block mb-2">
            Skill:
            <input
              type="text"
              value={skill_name}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxSkillNameLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingSkillNameChars} characters remaining
          </p>
        </div>
        <div>
          <label className="block mb-2">
            Skill ID:
            <input
              type="text"
              value={skill_id}
              onChange={(e) => setSkillId(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              maxLength={maxSkillIdLength}
              disabled={isLoading}
            />
          </label>
          <p className="text-gray-600 text-sm">
            {remainingSkillIdChars} characters remaining
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
          {isLoading ? 'Creating...' : 'Create Skill'}
        </button>
      </form>
    </div>
  );
};

export default SkillCreator;
