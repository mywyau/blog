import { fireEvent, render, screen } from '@testing-library/react';
import MobileNavBar from '../../../../src/views/components/navigation_bar/MobileNavBar';

describe('MobileNavBar component', () => {
    
    test('renders the MobileNavBar component', () => {
        const toggleMenu = jest.fn();
        render(<MobileNavBar isOpen={false} toggleMenu={toggleMenu} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        const svg = screen.getByTestId('menu-icon');
        expect(svg).toBeInTheDocument();
    });

    test('displays the correct icon when the menu is open', () => {
        const toggleMenu = jest.fn();
        render(<MobileNavBar isOpen={true} toggleMenu={toggleMenu} />);

        const svgPath = screen.getByTestId('menu-icon').querySelector('path');
        expect(svgPath).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
    });

    test('displays the correct icon when the menu is closed', () => {
        const toggleMenu = jest.fn();
        render(<MobileNavBar isOpen={false} toggleMenu={toggleMenu} />);

        const svgPath = screen.getByTestId('menu-icon').querySelector('path');
        expect(svgPath).toHaveAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
    });

    test('calls toggleMenu when the button is clicked', () => {
        const toggleMenu = jest.fn();
        render(<MobileNavBar isOpen={false} toggleMenu={toggleMenu} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(toggleMenu).toHaveBeenCalledTimes(1);
    });
});
