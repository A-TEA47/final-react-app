import React, { useState, useEffect } from 'react';
import { getAlbums } from '../services/api';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Albums</h2>
      <ul className="list-group">
        {albums.map((album) => (
          <li key={album.id} className="list-group-item">
            {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
