import React, { useState, useEffect } from 'react';
import { getPosts, getComments } from '../services/api';
import { downloadJSON } from '../utils/download';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const postsData = await getPosts();
        const commentsData = await getComments();
        setPosts(postsData);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching posts or comments:', err);
        setError('Failed to load posts or comments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndComments();
  }, []);

  const handleToggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleDownload = () => {
    const combinedData = posts.map((post) => ({
      ...post,
      comments: comments.filter((comment) => comment.postId === post.id),
    }));
    downloadJSON(combinedData, 'posts_with_comments.json');
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <h2 className="text-center text-primary mb-4">Posts with Comments</h2>
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search posts by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-success ms-3 btn-lg" onClick={handleDownload}>
            Download
          </button>
        </div>
        <ul className="list-group">
          {filteredPosts.map((post) => (
            <li key={post.id} className="list-group-item p-4 mb-3 bg-light shadow-sm rounded">
              <h5 className="text-info">{post.title}</h5>
              <p className="text-secondary">{post.body}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleToggleComments(post.id)}
              >
                {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {showComments[post.id] && (
                <div className="comments-container mt-4">
                  <h6 className="text-dark">Comments:</h6>
                  <ul className="list-group">
                    {comments
                      .filter((comment) => comment.postId === post.id)
                      .map((comment) => (
                        <li
                          key={comment.id}
                          className="list-group-item bg-white text-dark mb-2 shadow-sm rounded"
                        >
                          <strong>{comment.name}:</strong> {comment.body}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
