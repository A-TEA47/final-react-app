import React, { useEffect, useState } from 'react';
import { getPhotos } from '../services/api'; // Ensure the correct API function is imported


const Photos = () => {
  const [photos, setPhotos] = useState([]); // State to hold photos
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPhotos(); // Fetch photo data from the API
        setPhotos(data); // Update photos state
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos.');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Photos</h2>
      <div className="row">
        {photos.slice(0, 20).map((photo) => ( // Limit to 20 photos for display
          <div className="col-md-3 mb-4" key={photo.id}>
            <div className="card shadow-sm">
              <img
                src={photo.thumbnailUrl} // Use the thumbnail URL for the photo
                alt={photo.title}
                className="card-img-top"
              />
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
