// src/components/__tests__/SkillsCard.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import UseDeleteSkill from '../../../src/hooks/UseDeleteSkill';
import UserTypes from '../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../src/models/ADTs/UserTypeErrors';
import AuthService from '../../../src/service/AuthService';
import SkillsCard from '../../../src/views/components/skills/SkillsCard';
import { some, none } from 'fp-ts/Option'; // Import Option to mock return values correctly
import * as E from 'fp-ts/Either'; // Import Either for correct mocking
import { right } from 'fp-ts/Either';

// Mock necessary modules
jest.mock('../../../src/service/AuthService');
jest.mock('../../../src/hooks/UseDeleteSkill');

jest.mock('../../../src/views/components/buttons/DeleteSkillButton', () => ({ handleDelete, loading, errorMessage }) => (
  <button onClick={handleDelete}>Delete Skill</button>
));

jest.mock('../../../src/views/components/buttons/EditSkillButton', () => ({ skillId }) => (
  <button>Edit Skill</button>
));

describe('SkillsCard Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders skill and description correctly', () => {
    // Mock UseDeleteSkill return values
    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      loadingState: none,
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Check if the skill name and description are rendered
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library for building user interfaces.')).toBeInTheDocument();
  });

  // TODO: Fix this please
  // it('renders admin buttons when user role is Admin', async () => {

  //   // Mock the AuthService.getRole to return an Admin user using fp-ts Either
  //   (AuthService.getRole as jest.Mock).mockResolvedValue(
  //     right(UserTypes.Admin)
  //   );

  //   // Mock the UseDeleteSkill hook
  //   (UseDeleteSkill as jest.Mock).mockReturnValue({
  //     handleDelete: jest.fn(),
  //     loadingState: some(false),
  //     deleteErrorMessage: none,
  //     deleteResponseBody: none,
  //   });

  //   render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

  //   // Wait for the async role fetching
  //   expect(await screen.findByText('Edit Skill')).toBeInTheDocument();
  //   expect(await screen.findByText('Delete Skill')).toBeInTheDocument();
  // });

  it('does not render admin buttons when user role is Viewer', async () => {
    // Mock the AuthService.getRole to return a Viewer user using fp-ts Either
    (AuthService.getRole as jest.Mock).mockResolvedValue(
      E.right(UserTypes.Viewer)
    );

    // Mock the UseDeleteSkill hook
    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Wait for the async role fetching
    expect(screen.queryByText('Edit Skill')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Skill')).not.toBeInTheDocument();
  });

  it('does not render admin buttons if user role fetching fails', async () => {
    // Mock the AuthService.getRole to return an error using fp-ts Either
    (AuthService.getRole as jest.Mock).mockResolvedValue(
      E.left(UserTypeErrors.UnknownUserType)
    );

    // Mock the UseDeleteSkill hook
    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Wait for the async role fetching
    expect(screen.queryByText('Edit Skill')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Skill')).not.toBeInTheDocument();
  });

  it('calls the delete handler when the Delete button is clicked', async () => {
    const mockHandleDelete = jest.fn();

    // Mock the AuthService.getRole to return an Admin user using fp-ts Either
    (AuthService.getRole as jest.Mock).mockResolvedValue(
      E.right(UserTypes.Admin)
    );

    // Mock the UseDeleteSkill hook
    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Wait for the async role fetching and interaction
    const deleteButton = await screen.findByText('Delete Skill');
    fireEvent.click(deleteButton);

    // Ensure the delete handler is called
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
