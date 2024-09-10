import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SkillsCard from '../../../src/views/components/skills/SkillsCard';
import AuthService from '../../../src/service/AuthService';
import UseDeleteSkill from '../../../src/hooks/UseDeleteSkill';
import { some, none } from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import UserTypes from '../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../src/models/ADTs/UserTypeErrors';

// Mock necessary modules
jest.mock('../../../src/service/AuthService');
jest.mock('../../../src/hooks/UseDeleteSkill');

jest.mock('../../../src/views/components/buttons/DeleteSkillButton', () => ({ handleDelete }) => (
  <button onClick={handleDelete}>Delete Skill</button>
));

jest.mock('../../../src/views/components/buttons/EditSkillButton', () => ({ skillId }) => (
  <button>Edit Skill</button>
));

describe('SkillsCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockHandleDelete = jest.fn();

  it('renders skill and description correctly', () => {
    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: none,
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Ensure the skill name and description are rendered correctly
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library for building user interfaces.')).toBeInTheDocument();
  });

  it('renders admin buttons when user role is Admin', async () => {
    (AuthService.getRole as jest.Mock).mockResolvedValue(E.right(UserTypes.Admin));

    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Ensure the async role fetching is completed and buttons are rendered
    await waitFor(() => {
      expect(screen.getByText('Edit Skill')).toBeInTheDocument();
      expect(screen.getByText('Delete Skill')).toBeInTheDocument();
    });
  });

  it('does not render admin buttons when user role is Viewer', async () => {
    (AuthService.getRole as jest.Mock).mockResolvedValue(E.right(UserTypes.Viewer));

    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Ensure the buttons are not rendered for Viewer
    await waitFor(() => {
      expect(screen.queryByText('Edit Skill')).not.toBeInTheDocument();
      expect(screen.queryByText('Delete Skill')).not.toBeInTheDocument();
    });
  });

  it('handles unknown user type or error correctly', async () => {
    (AuthService.getRole as jest.Mock).mockResolvedValue(E.left(UserTypeErrors.UnknownUserType));

    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    // Ensure no buttons are rendered for unknown user type
    await waitFor(() => {
      expect(screen.queryByText('Edit Skill')).not.toBeInTheDocument();
      expect(screen.queryByText('Delete Skill')).not.toBeInTheDocument();
    });
  });

  it('calls delete handler when Delete button is clicked', async () => {
    (AuthService.getRole as jest.Mock).mockResolvedValue(E.right(UserTypes.Admin));

    (UseDeleteSkill as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<SkillsCard id={1} skill_id="123" skill="React" description="A JavaScript library for building user interfaces." />);

    const deleteButton = await screen.findByText('Delete Skill');
    fireEvent.click(deleteButton);

    // Ensure the delete handler is called when the button is clicked
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
