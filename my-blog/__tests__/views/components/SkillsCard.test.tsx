import { render, screen, waitFor } from '@testing-library/react';
import { fold as eitherFold } from 'fp-ts/lib/Either';
import { none } from 'fp-ts/Option';
import React from 'react';
import UserTypes from '../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../src/models/ADTs/UserTypeErrors';
import AuthService from '../../../src/service/AuthService';
import SkillsCard from '../../../src/views/components/skills/SkillsCard';

// Mocking external dependencies
jest.mock('../../../src/service/AuthService');
jest.mock('../../../src/hooks/UseDeleteSkill');
jest.mock('../../../src/views/components/buttons/DeleteSkillButton', () => () => <button>Delete</button>);
jest.mock('../../../src/views/components/buttons/EditSkillButton', () => () => <button>Edit</button>);

describe('SkillsCard Component', () => {
  let useStateSpy: jest.SpyInstance;

  const mockUseDeleteSkill = require('../../../src/hooks/UseDeleteSkill');

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the UseDeleteSkill hook to return the necessary properties
    mockUseDeleteSkill.default = jest.fn(() => ({
      handleDelete: jest.fn(), // Mock handleDelete function
      loadingState: false,     // Set the loading state
      deleteErrorMessage: '',  // Set no error message
      deleteResponseBody: {},  // Mock an empty response body
    }));
  });

  afterEach(() => {
    // Restore original useState after each test
    useStateSpy.mockRestore();
  });

  const skillData = {
    id: 1,
    skill_id: '123',
    skill: 'JavaScript',
    description: 'A versatile programming language.',
  };

  it('should render skill name and description', () => {
    render(<SkillsCard {...skillData} />);

    // Check if skill name and description are displayed
    expect(screen.getByText(skillData.skill)).toBeInTheDocument();
    expect(screen.getByText(skillData.description)).toBeInTheDocument();
  });

  it('should show Edit and Delete buttons for Admin role', async () => {
    // Mock the AuthService.getRole to return Admin
    AuthService.getRole.mockResolvedValue(eitherFold(() => UserTypeErrors.UnknownUserType, () => UserTypes.Admin));

    render(<SkillsCard {...skillData} />);

    // Wait for the async useEffect to complete
    await waitFor(() => {
      // Check if Edit and Delete buttons are rendered for Admin
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  it('should not show Edit and Delete buttons for Viewer role', async () => {
    // Mock the AuthService.getRole to return Viewer
    AuthService.getRole.mockResolvedValue(eitherFold(() => UserTypeErrors.UnknownUserType, () => UserTypes.Viewer));

    render(<SkillsCard {...skillData} />);

    // Wait for the async useEffect to complete
    await waitFor(() => {
      // Check that Edit and Delete buttons are not rendered for Viewer
      expect(screen.queryByText('Edit')).toBeNull();
      expect(screen.queryByText('Delete')).toBeNull();
    });
  });

  it('should not show Edit and Delete buttons for UnknownUserType', async () => {
    // Mock the AuthService.getRole to return UnknownUserType error
    AuthService.getRole.mockResolvedValue(eitherFold(() => UserTypeErrors.UnknownUserType, () => none));

    render(<SkillsCard {...skillData} />);

    // Wait for the async useEffect to complete
    await waitFor(() => {
      // Check that Edit and Delete buttons are not rendered for UnknownUserType
      expect(screen.queryByText('Edit')).toBeNull();
      expect(screen.queryByText('Delete')).toBeNull();
    });
  });

  it('should render the Delete and Edit buttons when userBasedContent is set for Admin', async () => {
    // Mock useState to return content as if the user is an Admin
    useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((initialValue) => [
      <div className="flex space-x-4">
        <button>Edit</button>
        <button>Delete</button>
      </div>,
      jest.fn(), // No need to update state in the test
    ]);

    render(<SkillsCard {...skillData} />);

    // Wait for the content to render
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });
});
