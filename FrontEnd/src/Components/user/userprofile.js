import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on the provided ID
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Type:</strong> {user.type}
      </div>
      {user.image && (
        <div>
          <img src={user.image} alt="User" />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
