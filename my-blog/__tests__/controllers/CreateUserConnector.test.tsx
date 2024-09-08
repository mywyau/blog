import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CreateUserConnector from '../../src/connectors/CreateUserConnector';
import { CreateUserFormData } from '../../src/models/UserData';


describe('CreateUserConnector', () => {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'; // You can set a default URL for testing

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('should successfully create a user', async () => {
        // Mock API response
        const mockUserData = {
            id: 1,
            role_id: 'admin',
            user_type: 'Admin',
            username: 'testuser',
            password: 'hashedPassword',
            email: 'testuser@example.com',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const createUserFormData: CreateUserFormData = {
            user_id: 'admin',
            user_type: 'Admin',
            username: 'testuser',
            password: 'password123',
            email: 'testuser@example.com',
            created_at: new Date(),
            updated_at: new Date(),
        };


        // Mock the axios post request
        mock.onPost(`${process.env.REACT_APP_API_BASE_URL}/create/account/user`)
            .reply(201, mockUserData); // Make sure it replies with the mockUserData


        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        expect(result.data).toEqual(mockUserData);
        expect(result.error).toBeUndefined();
    });

    it('should return error message if the user creation fails', async () => {
        const createUserFormData: CreateUserFormData = {
            user_id: 'admin',
            user_type: 'Admin',
            username: 'testuser',
            password: 'password123',
            email: 'testuser@example.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const errorMessage = '[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided.';

        mock.onPost(`${API_BASE_URL}/create/account/user`).reply(400, {
            message: "Failed to create user",
        });

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        expect(result.data).toBeUndefined();
        expect(result.error).toEqual(errorMessage);
    });


    it('should handle network or unexpected errors gracefully', async () => {
        const createUserFormData: CreateUserFormData = {
            user_id: 'admin',
            user_type: 'Admin',
            username: 'testuser',
            password: 'password123',
            email: 'testuser@example.com',
            created_at: new Date(),
            updated_at: new Date(),
        };

        mock.onPost(`${API_BASE_URL}/create/account/user`).networkError();

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        expect(result.data).toBeUndefined();
        expect(result.error).toEqual(
            '[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided.'
        );
    });
});
