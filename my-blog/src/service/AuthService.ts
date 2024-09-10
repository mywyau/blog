import { Either, left, right } from 'fp-ts/Either';
import LoginConnector from '../connectors/LoginConnector';
import UserTypes from '../models/ADTs/UserType';
import UserTypeErrors from '../models/ADTs/UserTypeErrors';

class AuthService {
    async getRole() {
        try {
            const { data } = await LoginConnector.getRole();

            switch (data.role) {
                case 'admin':
                    return right(UserTypes.Admin)
                case 'viewer':
                    return right(UserTypes.Viewer)
                default:
                    return right(UserTypes.NotLoggedIn)
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            return left(UserTypeErrors.UnknownUserType); // Error case
        }
    }
}

export default new AuthService();
