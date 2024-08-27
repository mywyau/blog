// __tests__/DeleteSkillButton.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import { DeleteResponseBody } from '../../../../src/models/DeleteResponseBody';
import DeleteSkillButton from '../../../../src/views/components/buttons/DeleteSkillButton';

describe('DeleteSkillButton Component', () => {
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button and call handleDelete on submit', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const button = screen.getByText('Delete this skill');
    fireEvent.click(button);

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it('should disable the button when loading is true', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={some(true)}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const button = screen.getByText('Delete this skill');
    expect(button).toBeDisabled();
  });

  it('should display an error message if errorMessage is provided', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={some('Error deleting the skill')}
        deleteResponseBody={none}
      />
    );

    expect(screen.getByText('Error deleting the skill')).toBeInTheDocument();
  });

  it('should render the delete response body if deleteResponseBody is provided', () => {
    const mockResponseBody: DeleteResponseBody = { message: 'Skill deleted successfully' };

    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={some(mockResponseBody)}
      />
    );

    expect(screen.getByText('Skill deleted successfully')).toBeInTheDocument();
  });

  it('should not display anything when errorMessage and deleteResponseBody are none', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    expect(screen.queryByText('Error deleting the skill')).not.toBeInTheDocument();
    expect(screen.queryByText('Skill deleted successfully')).not.toBeInTheDocument();
  });
});
