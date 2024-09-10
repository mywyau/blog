import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../../src/connectors/axiosInstance';
import CreateUserConnector from '../../src/connectors/CreateUserConnector';
import { CreateUserFormData, UserData } from '../../src/models/UserData';

describe('CreateUserConnector', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axiosInstance); // Mock the custom axios instance
    });

    afterEach(() => {
        mock.restore(); // Restore the mock after each test
    });

    const createUserFormData: CreateUserFormData = {
        user_id: 'user-12345',
        user_type: 'admin',
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        created_at: new Date('2024-09-10T10:30:00Z'),
        updated_at: new Date('2024-09-10T10:30:00Z'),
    };

    const mockUserData: UserData = {
        id: 1,
        user_id: 'user-12345',
        user_type: 'admin',
        username: 'testuser',
        password: 'hashedPassword',
        email: 'testuser@example.com',
        created_at: new Date('2024-09-10T10:30:00Z'),
        updated_at: new Date('2024-09-10T10:30:00Z'),
    };

    const mockUserDataStringData =
    {
        ...mockUserData,
        created_at: mockUserData.created_at.toISOString(),
        updated_at: mockUserData.updated_at.toISOString(),
    }

    it('should successfully create a user', async () => {
        // Mock a successful API response
        mock.onPost('/create/account/user').reply(201, mockUserDataStringData);

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        // Check that the data matches the expected format
        expect(result.data).toEqual(mockUserDataStringData);
        expect(result.error).toBeUndefined();
    });

    it('should return an error message when API call fails with 400', async () => {
        const errorMessage = 'User creation failed due to invalid data.';

        // Mock a 400 error response
        mock.onPost('/create/account/user').reply(400, { message: errorMessage });

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        // Check that the error message is handled properly
        expect(result.data).toBeUndefined();
        expect(result.error).toEqual(errorMessage);
    });

    it('should handle network or unexpected errors gracefully', async () => {
        // Mock a network error
        mock.onPost('/create/account/user').networkError();

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        // Expect a generic error message for network issues
        expect(result.data).toBeUndefined();
        expect(result.error).toEqual(
            '[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided.'
        );
    });

    it('should return the default error message when no specific error message is provided by the API', async () => {
        // Mock an API response with no error message
        mock.onPost('/create/account/user').reply(500, {});

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        // Expect a generic error message when the server doesn't provide one
        expect(result.data).toBeUndefined();
        expect(result.error).toEqual(
            '[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided.'
        );
    });

    it('should correctly format created_at and updated_at to ISO strings', async () => {
        mock.onPost('/create/account/user').reply(201, mockUserData);

        const result = await CreateUserConnector.postCreateUser(createUserFormData);

        // Check that the date fields are sent in ISO format
        expect(mock.history.post[0].data).toContain(
            `"created_at":"2024-09-10T10:30:00.000Z"`
        );
        expect(mock.history.post[0].data).toContain(
            `"updated_at":"2024-09-10T10:30:00.000Z"`
        );

        expect(result.data).toEqual(mockUserDataStringData);
    });
});
