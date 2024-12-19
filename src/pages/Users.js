import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import { downloadJSON } from '../utils/download';


const Users = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data || response); // Adjust based on API response structure
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

  const handleDownload = () => {
    downloadJSON(users, 'users.json');
  };

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Users</h2>
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary ms-3"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        <ul className="list-group">
          {filteredUsers.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{`${user.first_name || 'Unknown'} ${user.last_name || ''} - ${user.email || 'No Email'}`}</span>
              {user.avatar && (
                <img src={user.avatar} alt={user.first_name || 'Avatar'} className="rounded-circle" width="40" height="40" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
