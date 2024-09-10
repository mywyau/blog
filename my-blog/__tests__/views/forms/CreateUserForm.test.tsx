import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreateUserForm from '../../../src/views/forms/CreateUserForm';
import { checkEmailExists, checkUsernameExists } from '../../../src/service/LoginValidationService';
import CreateUserConnector from '../../../src/connectors/CreateUserConnector';

// Mocking the external services
jest.mock('../../../src/service/LoginValidationService');
jest.mock('../../../src/connectors/CreateUserConnector');

describe('CreateUserForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the basic un-authed form elements correctly', () => {
        render(<CreateUserForm />);
        
        // Check if all input fields are present
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

        // Check if submit button is present
        expect(screen.getByRole('button', { name: /create user/i })).toBeInTheDocument();
    });

    it('should show an error message if fields are empty on submission', async () => {
        render(<CreateUserForm />);

        // Click the submit button
        fireEvent.click(screen.getByRole('button', { name: /create user/i }));

        // Check if the error message appears
        expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();
    });

    it('should show username taken message if username is already taken', async () => {
        // Mock checkUsernameExists to return true (username is taken)
        checkUsernameExists.mockResolvedValue(true);

        render(<CreateUserForm />);

        // Fill in the username field
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'takenusername' }
        });

        // Trigger debounced username check
        await waitFor(() => expect(checkUsernameExists).toHaveBeenCalledWith('takenusername'));

        // Check if username taken message appears
        expect(await screen.findByText(/username is already taken/i)).toBeInTheDocument();
    });

    it('should show email taken message if email is already registered', async () => {
        // Mock checkEmailExists to return true (email is taken)
        checkEmailExists.mockResolvedValue(true);

        render(<CreateUserForm />);

        // Fill in the email field
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'takenemail@example.com' }
        });

        // Trigger debounced email check
        await waitFor(() => expect(checkEmailExists).toHaveBeenCalledWith('takenemail@example.com'));

        // Check if email taken message appears
        expect(await screen.findByText(/email is already registered/i)).toBeInTheDocument();
    });

    it('should display "Creating user..." when form is submitting', async () => {
        // Mock successful form submission
        CreateUserConnector.postCreateUser.mockResolvedValue({ data: true });

        render(<CreateUserForm />);

        // Fill in all the fields
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'newuser' }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'newuser@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /create user/i }));

        // Check if loading message appears
        expect(screen.getByText(/creating user.../i)).toBeInTheDocument();

        // Wait for the form to submit successfully
        await waitFor(() => expect(CreateUserConnector.postCreateUser).toHaveBeenCalled());

        // Check if the loading state is cleared (button text should return to 'Create User')
        expect(screen.getByRole('button', { name: /create user/i })).toBeInTheDocument();
    });

    it('should reset form after successful submission', async () => {
        // Mock successful form submission
        CreateUserConnector.postCreateUser.mockResolvedValue({ data: true });

        render(<CreateUserForm />);

        // Fill in all the fields
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'newuser' }
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'newuser@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /create user/i }));

        // Wait for the form to submit successfully
        await waitFor(() => expect(CreateUserConnector.postCreateUser).toHaveBeenCalled());

        // Ensure the form resets
        expect(screen.getByLabelText(/username/i)).toHaveValue('');
        expect(screen.getByLabelText(/email/i)).toHaveValue('');
        expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
});
