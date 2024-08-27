import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import SkillsCard from '../../../src/views/components/skills/SkillsCard';

import { none } from 'fp-ts/lib/Option';
import UseDeleteSkill from '../../../src/hooks/UseDeleteSkill';


jest.mock('../../../src/hooks/UseDeleteSkill');


describe('SkillsCard Component', () => {
  const mockSkill = {
    id: 1,
    skill_id: '123',
    skill: 'JavaScript',
    description: 'A versatile programming language primarily used for web development.',
  };

  it('renders the skill and description correctly', () => {
    const mockHandleDelete = jest.fn();

    UseDeleteSkill.mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: false,
      deleteErrorMessage: '',
      deleteResponseBody: none, // Properly mock the fp-ts Option
    });

    render(
      <BrowserRouter>
        <SkillsCard {...mockSkill} />
      </BrowserRouter>
    );

    // Check if the skill name is rendered
    expect(screen.getByText('JavaScript')).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText('A versatile programming language primarily used for web development.')).toBeInTheDocument();
  });

  it('renders EditSkillButton and DeleteSkillButton', () => {

    const mockHandleDelete = jest.fn();

    UseDeleteSkill.mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: false,
      deleteErrorMessage: '',
      deleteResponseBody: none, // Properly mock the fp-ts Option
    });

    render(
      <BrowserRouter>
        <SkillsCard {...mockSkill} />
      </BrowserRouter>
    );

    // Check if the EditSkillButton is rendered
    expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();

    // Check if the DeleteSkillButton is rendered
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls handleDelete when DeleteSkillButton is clicked', () => {
    const mockHandleDelete = jest.fn();

    UseDeleteSkill.mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: false,
      deleteErrorMessage: '',
      deleteResponseBody: none, // Properly mock the fp-ts Option
    });

    render(
      <BrowserRouter>
        <SkillsCard {...mockSkill} />
      </BrowserRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  // TODO: Add test or delete    
  // it('shows an error message if deletion fails', () => {

  //    const mockHandleDelete = jest.fn();

  //   UseDeleteSkill.mockReturnValue({
  //       handleDelete: mockHandleDelete,
  //       loadingState: false,
  //       deleteErrorMessage: '',
  //       deleteResponseBody: none, // Properly mock the fp-ts Option
  //   });

  //   render(
  //     <BrowserRouter>
  //       <SkillsCard {...mockSkill} />
  //     </BrowserRouter>
  //   );

  //   // Assuming your DeleteSkillButton displays the error message in some way
  //   expect(screen.getByText('Failed to delete skill')).toBeInTheDocument();
  // });
});

