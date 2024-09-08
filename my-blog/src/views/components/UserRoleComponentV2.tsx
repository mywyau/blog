import React from 'react';
import UserTypes from '../../models/ADTs/UserType';
import AuthService from '../../service/AuthService';

class UserRoleComponentV2 extends React.Component {
    
    state = {
        userRole: null,
        error: null
    };

    async componentDidMount() {
        try {
            const role = await AuthService.getRole();
            this.setState({ userRole: role });
        } catch (error) {
            this.setState({ error: "Failed to fetch user role" });
        }
    }

    render() {
        const { userRole, error } = this.state;

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div>
                {userRole === UserTypes.Admin && (
                    <button className="admin-button">Admin Settings</button>
                )}
                {userRole === UserTypes.Viewer && (
                    <p>You're logged in as a Viewer.</p>
                )}
            </div>
        );
    }
}

export default UserRoleComponentV2;
