// __tests__/EditSkillButton.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditSkillButton from '../../../../src/views/components/buttons/EditSkillButton';

describe('EditSkillButton Component', () => {
  it('should render the Edit Skill button with the correct link based on skillId', () => {
    const skillId = 'skill123';

    render(
      <MemoryRouter>
        <EditSkillButton skillId={skillId} />
      </MemoryRouter>
    );

    const editButton = screen.getByText('Edit Skill');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute('href', `/edit-skill/${skillId}`);
  });

  it('should apply the correct classes to the link', () => {
    const skillId = 'skill123';

    render(
      <MemoryRouter>
        <EditSkillButton skillId={skillId} />
      </MemoryRouter>
    );

    const editButton = screen.getByText('Edit Skill');
    expect(editButton).toHaveClass(
      'inline-block',
      'font-nunito',
      'p-1',
      'pr-3',
      'pl-3',
      'text-sm',
      'rounded-md',
      'focus:outline-none',
      'bg-gradient-to-r',
      'from-info-start',
      'to-info-end',
      'text-white',
      'hover:animate-light-up'
    );
  });
});
