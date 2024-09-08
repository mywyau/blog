import axios from 'axios';

// Check if the username is taken
export const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `/api/check-username`, { params: { username } });
        return response.data.exists; // Returns true if username exists, false otherwise
    } catch (error) {
        console.error('Error checking username:', error);
        return false; // Fallback to false in case of an error
    }
};

// Check if the email is taken
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + `/api/check-email`, { params: { email } });
        return response.data.exists; // Returns true if email exists, false otherwise
    } catch (error) {
        console.error('Error checking email:', error);
        return false; // Fallback to false in case of an error
    }
};
