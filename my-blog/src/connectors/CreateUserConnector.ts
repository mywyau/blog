import { AxiosError } from 'axios';
import { CreateUserFormData, UserData } from '../models/UserData';
import axiosInstance from './axiosInstance';

class CreateUserConnector {
    async postCreateUser(createUserFormData: CreateUserFormData): Promise<{ data?: UserData; error?: string }> {
        try {
            const response = await axiosInstance.post('/create/account/user', {
                ...createUserFormData,
                created_at: createUserFormData.created_at.toISOString(),
                updated_at: createUserFormData.updated_at.toISOString(),
            });
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(`[CreateUserConnector][postCreateUser] Error:`, axiosError);

            return {
                error:
                    axiosError.response?.data?.message ||
                    `[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided 
                    ${axiosError.response?.data?.message}
                    `,
            };
        }
    }
}

export default new CreateUserConnector();
