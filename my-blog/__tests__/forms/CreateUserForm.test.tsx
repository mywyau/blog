import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUserForm from '../../src/forms/CreateUserForm';
import CreateUserConnector from '../../src/connectors/CreateUserConnector';

// Mock the connector
jest.mock('../../src/connectors/CreateUserConnector', () => ({
    postCreateUser: jest.fn(),
}));

describe('CreateUserForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(<CreateUserForm />);

        expect(screen.getByLabelText(/Role Id/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/User Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create User/i })).toBeInTheDocument();
    });

    it('displays validation error if fields are empty', async () => {
        render(<CreateUserForm />);

        fireEvent.click(screen.getByRole('button', { name: /Create User/i }));

        await waitFor(() => {
            expect(screen.getByText(/All fields are required./i)).toBeInTheDocument();
        });
    });

    it('submits form with valid data', async () => {
        const mockCreateUser = CreateUserConnector.postCreateUser as jest.Mock;
        mockCreateUser.mockResolvedValue({ data: { id: 1 }, error: null });

        render(<CreateUserForm />);

        fireEvent.change(screen.getByLabelText(/Role Id/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/User Type/i), { target: { value: 'Admin' } });
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Create User/i }));

        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledTimes(1);
            expect(mockCreateUser).toHaveBeenCalledWith({
                role_id: 'admin',
                user_type: 'Admin',
                username: 'JohnDoe',
                password: 'password123',
                email: 'john@example.com',
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
            });
            expect(screen.queryByText(/All fields are required./i)).not.toBeInTheDocument();
        });
    });

    it('displays error message on failure', async () => {
        const mockCreateUser = CreateUserConnector.postCreateUser as jest.Mock;
        mockCreateUser.mockResolvedValue({ data: null, error: 'Error creating user' });

        render(<CreateUserForm />);

        fireEvent.change(screen.getByLabelText(/Role Id/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/User Type/i), { target: { value: 'Admin' } });
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Create User/i }));

        await waitFor(() => {
            expect(screen.getByText(/\[CreateUserForm\]\[handleSubmit\] Error creating user, user was not created/i)).toBeInTheDocument();
        });
    });

    it('shows loading state while submitting', async () => {
        const mockCreateUser = CreateUserConnector.postCreateUser as jest.Mock;

        render(<CreateUserForm />);

        fireEvent.change(screen.getByLabelText(/Role Id/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/User Type/i), { target: { value: 'Admin' } });
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Create User/i }));

        expect(screen.getByRole('button', { name: /Creating.../i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Creating.../i })).toBeDisabled();

        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledTimes(1);
        });
    });
});
