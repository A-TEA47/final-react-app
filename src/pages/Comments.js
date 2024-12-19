import React, { useState, useEffect } from 'react';
import { getComments } from '../services/api';
import Search from '../components/Search'; // Import the Search component

const Comments = () => {
  const [comments, setComments] = useState([]); // List of all comments
  const [filteredComments, setFilteredComments] = useState([]); // Filtered comments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
        setFilteredComments(data); // Initialize filtered comments
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    // Filter comments based on search term
    const filtered = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchTerm, comments]);

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Comments</h2>
      {/* Search Component */}
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search comments..."
      />
      <ul className="list-group">
        {filteredComments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <h5>{comment.name}</h5>
            <p>{comment.body}</p>
            <p>
              <strong>Email:</strong> {comment.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
