import React, { useState, useEffect } from 'react';
import { getPhotos } from '../services/api';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos();
        setPhotos(data.slice(0, 50)); // Display only 50 photos for better performance
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Photos</h2>
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-md-3 mb-4">
            <div className="card">
              <img src={photo.thumbnailUrl} className="card-img-top" alt={photo.title} />
              <div className="card-body">
                <p className="card-text">{photo.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
