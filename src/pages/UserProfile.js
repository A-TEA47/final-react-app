import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../services/api';

const UserProfile = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers(); // Fetch all users
        const foundUser = response.data.find((u) => u.id === parseInt(id, 10)); // Find user by ID
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      {user && (
        <div className="card">
          <img
            src={user.avatar} // Assuming the API provides an avatar URL
            alt={`${user.first_name} ${user.last_name}`}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">
              {user.first_name} {user.last_name}
            </h5>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">ID: {user.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
