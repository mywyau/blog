import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ForgotPasswordForm from '../../../src/views/forms/ForgottenPasswordForm';

const mockAxios = new MockAdapter(axios);

describe('ForgotPasswordForm', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    test('displays validation error when email is not provided', async () => {
        render(<ForgotPasswordForm />);

        fireEvent.click(screen.getByRole('button', { name: /send password reset link/i }));

        expect(await screen.findByText(/please enter your email address/i)).toBeInTheDocument();
    });

    test('successfully sends password reset link', async () => {
        render(<ForgotPasswordForm />);

        // Fill in the email field
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

        // Mock successful password reset link response
        mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`).reply(200);

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /send password reset link/i }));

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText(/a password reset link has been sent to your email address/i)).toBeInTheDocument();
        });
    });

    test('displays error message when network request fails', async () => {
        render(<ForgotPasswordForm />);

        // Fill in the email field
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

        // Mock network error
        mockAxios.onPost(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`).networkError();

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /send password reset link/i }));

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(/an error occurred while trying to send the password reset link/i)).toBeInTheDocument();
        });
    });
});
