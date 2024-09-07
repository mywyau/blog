import LoginConnector from '../connectors/LoginConnector';
import UserTypes from '../models/ADTs/UserType';
import UserTypeErrors from '../models/ADTs/UserTypeErrors';

class AuthService {

    async getRole(): Promise<UserTypes | UserTypeErrors> {
        try {
            const { data } = await LoginConnector.getRole();

            if (data.role === "admin") {
                return UserTypes.Admin;
            } else {
                return UserTypes.Viewer;
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            return UserTypeErrors.UnknownUserType;
        }
    }
}

export default new AuthService();
