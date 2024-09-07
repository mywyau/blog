import { useState } from 'react';
import CreateUserConnector from '../../connectors/CreateUserConnector';
import { CreateUserFormData } from '../../models/UserData';

const CreateUserForm: React.FC = () => {

    const generateUserId = () => {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 10000);  // A random number between 0 and 9999  or we could use uuid library
        return `user-${timestamp}${randomNumber}`;
    };

    const [user_id, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        const connector = CreateUserConnector;

        const userToCreate: CreateUserFormData = {
            user_id: generateUserId(),
            user_type: "user",
            username: username,
            password: password,
            email: email,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const { data, error } = await connector.postCreateUser(userToCreate);

            if (data) {
                alert('User created successfully');
                setUserId('');
                setUserType('');
                setUsername('');
                setPassword('');
                setEmail('');
            } else {
                setErrorMessage('[CreateUserForm][handleSubmit] Error creating user, user was not created');
            }
        } catch (err) {
            setErrorMessage('An error occurred while creating the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Create New User</h2>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div className="mb-6">
                <label htmlFor="username" className="text-lg block text-gray-800">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="text-lg block text-gray-800">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-10">
                <label htmlFor="password" className="text-lg block text-gray-800">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Creating...' : 'Create User'}
            </button>
        </form>
    );
};

export default CreateUserForm;
