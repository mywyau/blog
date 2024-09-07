// Example of making a request to a protected route






const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class LoginConnector {


  async fetchProtectedData() {
    const response = await fetch('/admin/only', {
      method: 'GET',
      credentials: 'include',  // This ensures cookies are sent with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Protected data:", data);
    } else {
      console.log("Unauthorized or session expired");
    }
  }

}

export default new LoginConnector;