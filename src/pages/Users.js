import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data || response); // Ensure the API response structure is handled correctly
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = (users || []).filter((user) => {
    const firstName = user.first_name || ''; // Ensure `first_name` is a string
    const email = user.email || ''; // Ensure `email` is a string
    return (
      firstName.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

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
      <h2 className="page-title text-primary">Users</h2>
      <div className="card">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="list-group">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => navigate(`/users/${user.id}`)} // Navigate to user profile
              style={{ cursor: 'pointer' }}
            >
              <span>
                {user.first_name || 'Unknown'} - {user.email || 'No Email'}
              </span>
              <img
                src={user.avatar}
                alt={user.first_name || 'Avatar'}
                className="rounded-circle"
                width="40"
                height="40"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
