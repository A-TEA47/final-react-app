import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/api';

const PostDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  return (
    <div className="container mt-5">
      {user && (
        <>
          <h2>{user.first_name} {user.last_name}</h2>
          <img src={user.avatar} alt={user.first_name} className="rounded-circle" width="150" />
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
};

export default PostDetails;
