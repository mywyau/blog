import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class CreateUserConnector {

    async postCreateUser(createUserFormData: CreateUserForm): Promise<{ data?: UserData; error?: string }> {

        try {
            const response =
                await axios.post(`${API_BASE_URL}/create/account/user`,
                    {
                        ...createUserFormData,
                        created_at: createUserFormData.created_at.toISOString(),
                        updated_at: createUserFormData.updated_at.toISOString(),
                    });
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[CreateUserConnector][postCreateUser] An error occurred while trying to create the user. Please check all necessary information is provided.'
            };
        }
    }
}

export default new CreateUserConnector;