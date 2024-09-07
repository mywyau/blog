import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRole = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-user-role`, {
          withCredentials: true
        });

        setRole(response.data.role);
        setMessage(response.data.message);
      } catch (error) {
        setError('Failed to fetch user role');
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : <p>{message}</p>}
      {role === 'admin' && <p>Welcome Admin! You have full access.</p>}
      {role !== 'admin' && <p>You are a viewer. Limited access.</p>}
    </div>
  );
};

export default UserRole;
