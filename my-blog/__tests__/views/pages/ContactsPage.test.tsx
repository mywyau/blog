import { render, screen } from '@testing-library/react';
import messages from '../../../src/messages/contact';
import Contact from '../../../src/views/pages/ContactsPage';

jest.mock('../../../src/views/components/Copyright', () => () => <div>Copyright Mock</div>);
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div>Navbar Mock</div>);

describe('Contact Page', () => {

    it('should render the Navbar', () => {
        render(<Contact />);

        expect(screen.getByText('Navbar Mock')).toBeInTheDocument;
    });

    it('should render the Copyright components', () => {
        render(<Contact />);
        expect(screen.getByText('Copyright Mock')).toBeInTheDocument;
    });

    it('should render the correct title', () => {
        render(<Contact />);
        expect(screen.getByText(messages.title)).toBeInTheDocument;
    });

    it('should display the RHS box with correct information', () => {
        render(<Contact />);
        expect(screen.getByText(messages.phoneNumber.mobile)).toBeInTheDocument();
        expect(screen.getByText(messages.email)).toBeInTheDocument();
        expect(screen.getByText(messages.address.houseNumber)).toBeInTheDocument();
        expect(screen.getByText(messages.address.street)).toBeInTheDocument();
        expect(screen.getByText(messages.address.county)).toBeInTheDocument();
        expect(screen.getByText(messages.address.city)).toBeInTheDocument();
        expect(screen.getByText(messages.address.country)).toBeInTheDocument();
    });

    it('should display the LHS box with some Lorem Ipsum', () => {
        render(<Contact />);
        expect(screen.getByText(messages.lorem.p1)).toBeInTheDocument();
        expect(screen.getByText(messages.lorem.p2)).toBeInTheDocument();
        expect(screen.getByText(messages.lorem.p3)).toBeInTheDocument();
        expect(screen.getByText(messages.lorem.p4)).toBeInTheDocument();
        expect(screen.getByText(messages.lorem.p5)).toBeInTheDocument();
    });

});