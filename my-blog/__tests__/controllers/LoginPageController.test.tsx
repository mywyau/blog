import { render, screen } from '@testing-library/react';
import LoginController from '../../src/controllers/LoginController';


jest.mock('../../src/views/pages/LoginPage', () => () => <div>Mocked LoginPage</div>);

describe('LoginController', () => {
    test('renders LoginPage component', () => {
        render(<LoginController />);

        // Check if the LoginPage is rendered
        expect(screen.getByText('Mocked LoginPage')).toBeInTheDocument();
    });
});
