import { useState } from 'react';
import CreateUserConnector from '../connectors/CreateUserConnector';
import { CreateUserFormData } from '../models/UserData';

const CreateUserForm: React.FC = () => {
    const [roleId, setRoleId] = useState('');
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password || !userType || !roleId) {
            setErrorMessage('All fields are required.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        const connector = CreateUserConnector;

        const userToCreate: CreateUserFormData = {
            role_id: roleId,
            user_type: userType,
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
                setRoleId('');
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New User</h2>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div className="mb-4">
                <label className="block text-gray-700">Role Id</label>
                <input
                    type="text"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">User Type</label>
                <input
                    type="text"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Creating...' : 'Create User'}
            </button>
        </form>
    );
};

export default CreateUserForm;
