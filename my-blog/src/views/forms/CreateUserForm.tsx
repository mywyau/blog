import { useState } from 'react';
import CreateUserConnector from '../../connectors/CreateUserConnector';
import RoleProtected from '../../contexts/RoleProtected';
import { UserRoleProvider } from '../../contexts/UserRoleContext';
import UserTypes from '../../models/ADTs/UserType';
import { CreateUserFormData } from '../../models/UserData';

// Utility function to generate user ID
const generateUserId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `user-${timestamp}${randomNumber}`;
};

const CreateUserForm: React.FC = () => {
    // Destructure state into a single object for form values
    const [formData, setFormData] =
        useState(
            {
                user_id: '',
                userType: '',
                username: '',
                password: '',
                email: '',
            }
        );

    const { username, password, email, userType } = formData;

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Generalized input handler for all fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password || !userType) {
            setErrorMessage('All fields, including role, are required.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        const userToCreate: CreateUserFormData = {
            user_id: generateUserId(),
            user_type: userType, // Ensure this matches the role selected
            username,
            password,
            email,
            created_at: new Date(),
            updated_at: new Date(),
        };

        // Debug: Log the payload to see what is being sent
        console.log("User to create:", userToCreate);

        try {
            const { data, error } = await CreateUserConnector.postCreateUser(userToCreate);

            // Debug: Log response to see what's coming from the API
            console.log("API Response:", data, error);

            if (data) {
                alert('User created successfully');
                setFormData({
                    user_id: '',
                    userType: '',
                    username: '',
                    password: '',
                    email: '',
                });
            } else {
                setErrorMessage('Error creating user. User was not created.');
            }
        } catch (err) {
            setErrorMessage('An error occurred while creating the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserRoleProvider>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Create New User</h2>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <InputField
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={handleChange}
                />

                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                />

                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />

                <RoleProtected roles={[UserTypes.Admin]}>
                    <div className="mb-6">
                        <label htmlFor="userType" className="text-lg block text-gray-800">Role:</label>
                        <select
                            id="userType"
                            value={userType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>
                </RoleProtected>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </UserRoleProvider>
    );
};

// Reusable input field component
interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange }) => (
    <div className="mb-6">
        <label htmlFor={id} className="text-lg block text-gray-800">{label}:</label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
    </div>
);

export default CreateUserForm;
