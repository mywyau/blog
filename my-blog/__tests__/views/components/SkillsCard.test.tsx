import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillsCard from '../../../src/views/components/SkillsCard';

describe('SkillsCard Component', () => {
  it('renders the skill and description', () => {
    const skill = 'JavaScript';
    const description = 'A versatile programming language primarily used for web development.';

    render(<SkillsCard id={1} skill={skill} description={description} />);

    expect(screen.getByText(skill)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('applies the correct styles to the skill and description', () => {
    render(<SkillsCard id={1} skill="JavaScript" description="A versatile programming language primarily used for web development." />);

    const skillElement = screen.getByText('JavaScript').parentElement;;
    expect(skillElement).toHaveClass('text-xl');
    expect(skillElement).toHaveClass('bg-gradient-to-r');
    expect(skillElement).toHaveClass('from-blue-500');
    expect(skillElement).toHaveClass('to-green-500');
    expect(skillElement).toHaveClass('bg-clip-text');
    expect(skillElement).toHaveClass('text-transparent');

    const descriptionElement = screen.getByText('A versatile programming language primarily used for web development.');
    expect(descriptionElement).toHaveClass('text-base');
    expect(descriptionElement).toHaveClass('text-gray-700');
    expect(descriptionElement).toHaveClass('mb-4');
  });

  it('applies the correct container styles', () => {
    render(<SkillsCard id={1} skill="JavaScript" description="A versatile programming language primarily used for web development." />);

    const container = screen.getByText('JavaScript').parentElement?.parentElement?.parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('flex-none');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('pt-6');
    expect(container).toHaveClass('pb-6');
  });

  it('applies the correct inner container styles', () => {
    render(<SkillsCard id={1} skill="JavaScript" description="A versatile programming language primarily used for web development." />);

    const innerContainer = screen.getByText('JavaScript').parentElement?.parentElement;
    expect(innerContainer).toHaveClass('bg-white');
    expect(innerContainer).toHaveClass('rounded-lg');
    expect(innerContainer).toHaveClass('shadow-lg');
    expect(innerContainer).toHaveClass('p-6');
    expect(innerContainer).toHaveClass('md:p-8');
    expect(innerContainer).toHaveClass('h-full');
  });
});
