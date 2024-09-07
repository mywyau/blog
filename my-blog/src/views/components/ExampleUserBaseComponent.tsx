import React, { useState, useEffect } from 'react';

const AdminButton = () => {
  const [userRole, setUserRole] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    // Fetch the user's role from the backend
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/get-user-role', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role); // Assuming backend returns { role: 'admin' }
        } else {
          setError('Failed to fetch user role');
        }
      } catch (err) {
        setError('Error fetching user role');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can show a loading spinner
  }

  if (error) {
    return <p>{error}</p>; // Handle error cases
  }

  // Conditionally render the button for admin users
  return (
    <div>
      {userRole === 'admin' ? (
        <button className="admin-button">Admin-Only Button</button>
      ) : (
        <p>You do not have permission to see this button.</p>
      )}
    </div>
  );
};

export default AdminButton;
