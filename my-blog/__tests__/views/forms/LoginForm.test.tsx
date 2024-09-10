import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from '../../../src/views/forms/LoginForm';
import LoginConnector from '../../../src/connectors/LoginConnector';


// Mock the LoginConnector to simulate login API behavior
jest.mock('../../../src/connectors/LoginConnector');

describe('LoginForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render form elements correctly', () => {
        render(<LoginForm />);

        // Check if form inputs and button are present
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should show an error message if fields are empty on submission', async () => {
        render(<LoginForm />);

        // Click the submit button without entering any credentials
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the error message appears
        expect(await screen.findByText(/please fill in both fields/i)).toBeInTheDocument();
    });

    it('should show an error message if login fails', async () => {
        // Mock failed login response
        LoginConnector.login.mockResolvedValue({
            error: 'Invalid credentials',
        });

        render(<LoginForm />);

        // Fill in the username and password fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the error message appears
        expect(await screen.findByText(/invalid login credentials/i)).toBeInTheDocument();
    });

    it('should redirect to home page on successful login', async () => {
        // Mock successful login response
        LoginConnector.login.mockResolvedValue({
            error: null,
        });

        // Mock window.location.href to test the redirect
        delete window.location;
        window.location = { href: jest.fn() };

        render(<LoginForm />);

        // Fill in the username and password fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpassword' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Wait for the redirect
        await waitFor(() => {
            expect(window.location.href).toBe('/');
        });
    });

    it('should display "Logging in..." and disable button during submission', async () => {
        // Mock successful login response
        LoginConnector.login.mockResolvedValue({
            error: null,
        });

        render(<LoginForm />);

        // Fill in the username and password fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpassword' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the button shows "Logging in..." and is disabled
        expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();

        // Wait for the login process to complete
        await waitFor(() => {
            expect(LoginConnector.login).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'correctpassword',
            });
        });
    });
});
