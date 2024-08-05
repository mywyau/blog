import { render, screen } from '@testing-library/react';
import InterestsCard from '../src/views/components/InterestsCard';

describe('InterestsCard component', () => {
    const mockInterest = {
        id: 1,
        interest: 'Cooking',
        description: 'I love cooking various cuisines.',
    };

    test('renders the InterestsCard component with correct interest and description', () => {
        render(<InterestsCard {...mockInterest} />);

        const interestElement = screen.getByText(mockInterest.interest);
        const descriptionElement = screen.getByText(mockInterest.description);

        expect(interestElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });

    test('renders with the correct class names', () => {
        render(<InterestsCard {...mockInterest} />);

        const cardElement = screen.getByText(mockInterest.interest).parentElement?.parentElement;
        expect(cardElement).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg', 'p-6', 'md:p-8', 'h-full');

        const containerElement = cardElement?.parentElement;
        expect(containerElement).toHaveClass('flex', 'flex-col', 'flex-none', 'w-full', 'pt-6', 'pb-6', 'md:w-auto');
    });

    test('renders the text with gradient class', () => {
        render(<InterestsCard {...mockInterest} />);

        const interestElement = screen.getByText(mockInterest.interest).parentElement;
        expect(interestElement).toHaveClass('text-xl', 'bg-gradient-to-r', 'from-blue-500', 'to-green-500', 'bg-clip-text', 'text-transparent');
    });

    test('renders the description with correct text color class', () => {
        render(<InterestsCard {...mockInterest} />);

        const descriptionElement = screen.getByText(mockInterest.description);
        expect(descriptionElement).toHaveClass('text-base', 'text-gray-700', 'mb-4');
    });
});
