import axios from 'axios';
import { checkEmailExists, checkUsernameExists } from '../../src/service/LoginValidationService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API checks', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });


    test('checkUsernameExists should return true if username exists', async () => {
        // Mock the response for the API call
        mockedAxios.get.mockResolvedValueOnce({ data: { exists: true } });

        const result = await checkUsernameExists('testuser');
        expect(result).toBe(true);
    });

    test('checkUsernameExists should return false if username does not exist', async () => {
        // Mock the response for the API call
        mockedAxios.get.mockResolvedValueOnce({ data: { exists: false } });

        const result = await checkUsernameExists('testuser');
        expect(result).toBe(false);
    });

    test('checkUsernameExists should return false on API error', async () => {
        // Mock the API to throw an error
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        const result = await checkUsernameExists('testuser');
        expect(result).toBe(false);
    });

    test('checkEmailExists should return true if email exists', async () => {
        // Mock the response for the API call
        mockedAxios.get.mockResolvedValueOnce({ data: { exists: true } });

        const result = await checkEmailExists('test@example.com');
        expect(result).toBe(true);
    });

    test('checkEmailExists should return false if email does not exist', async () => {
        // Mock the response for the API call
        mockedAxios.get.mockResolvedValueOnce({ data: { exists: false } });

        const result = await checkEmailExists('test@example.com');
        expect(result).toBe(false);
    });

    test('checkEmailExists should return false on API error', async () => {
        // Mock the API to throw an error
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        const result = await checkEmailExists('test@example.com');
        expect(result).toBe(false);
    });
});