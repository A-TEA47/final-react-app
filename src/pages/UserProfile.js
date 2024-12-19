import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../services/api'; // Ensure the API fetch is correct


const UserProfile = () => {
  const { userId } = useParams(); // Get userId from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers(); // Assuming getUsers fetches all users
        const foundUser = response.find((user) => user.id === parseInt(userId));
        if (!foundUser) throw new Error('User not found');
        setUser(foundUser);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="text-center">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="rounded-circle mb-3"
            width="100"
            height="100"
          />
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-secondary">{user.email}</p>
        </div>
        <div className="mt-4">
          <h5 className="text-primary">Details:</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {user.id}
            </li>
            <li className="list-group-item">
              <strong>First Name:</strong> {user.first_name}
            </li>
            <li className="list-group-item">
              <strong>Last Name:</strong> {user.last_name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
