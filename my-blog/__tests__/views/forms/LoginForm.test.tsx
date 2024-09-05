import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LoginForm from '../../../src/views/forms/LoginForm';

const mockAxios = new MockAdapter(axios);

describe('LoginForm', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    test('renders login form correctly', () => {
        render(<LoginForm />);

        // Check if the form elements are rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('shows error message if fields are empty', async () => {
        render(<LoginForm />);

        // Simulate form submission without entering username or password
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the error message is displayed
        await waitFor(() => {
            expect(screen.getByText('Please fill in both fields.')).toBeInTheDocument();
        });
    });

    test('shows loading state while logging in', async () => {
        render(<LoginForm />);

        // Fill in the fields
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password' },
        });

        // Simulate a successful login response
        mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/login`).reply(200, {
            token: 'fake-token',
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the loading text is displayed
        expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    });

    // TODO: Fix this test
    // test('successful login stores token and redirects', async () => {
    //     const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    //     const mockWindowLocation = jest.spyOn(window, 'location', 'get');
    //     const mockHref = jest.fn();
    //     mockWindowLocation.mockReturnValue({ href: mockHref });

    //     render(<LoginForm />);

    //     // Fill in the fields
    //     fireEvent.change(screen.getByLabelText(/username/i), {
    //         target: { value: 'testuser' },
    //     });
    //     fireEvent.change(screen.getByLabelText(/password/i), {
    //         target: { value: 'password' },
    //     });

    //     // Simulate a successful login response
    //     mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/login`).reply(200, {
    //         token: 'fake-token',
    //     });

    //     // Submit the form
    //     fireEvent.click(screen.getByRole('button', { name: /login/i }));

    //     // Wait for the login process to complete
    //     await waitFor(() => {
    //         expect(mockSetItem).toHaveBeenCalledWith('token', 'fake-token');
    //         expect(mockHref).toHaveBeenCalledWith('/dashboard');
    //     });

    //     mockSetItem.mockRestore();
    // });

    // TODO: Fix this test
    // test('shows error message on failed login', async () => {
    //     render(<LoginForm />);

    //     // Fill in the fields
    //     fireEvent.change(screen.getByLabelText(/username/i), {
    //         target: { value: 'testuser' },
    //     });
    //     fireEvent.change(screen.getByLabelText(/password/i), {
    //         target: { value: 'wrongpassword' },
    //     });

    //     // Simulate a failed login response
    //     mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/login`).reply(401, {
    //         message: 'Invalid credentials',
    //     });

    //     // Submit the form
    //     fireEvent.click(screen.getByRole('button', { name: /login/i }));

    //     // Wait for the error message to be displayed
    //     await waitFor(() => {
    //         expect(screen.getByText('Invalid login credentials.')).toBeInTheDocument();
    //     });
    // });

    test('handles network error gracefully', async () => {
        render(<LoginForm />);

        // Fill in the fields
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password' },
        });

        // Simulate a network error
        mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/login`).networkError();

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('An error occurred while logging in. Please try again.')).toBeInTheDocument();
        });
    });
});
