import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Welcome to the App</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={() => navigate('/posts')}
          >
            View Posts
          </button>
        </div>
        <div className="col-md-4 mb-4">
          <button
            className="btn btn-success btn-lg w-100"
            onClick={() => navigate('/todos')}
          >
            View Todos
          </button>
        </div>
        <div className="col-md-4 mb-4">
          <button
            className="btn btn-info btn-lg w-100"
            onClick={() => navigate('/users')}
          >
            View Users
          </button>
        </div>
        <div className="col-md-4 mb-4">
          <button
            className="btn btn-warning btn-lg w-100"
            onClick={() => navigate('/albums')}
          >
            View Albums
          </button>
        </div>
        <div className="col-md-4 mb-4">
          <button
            className="btn btn-danger btn-lg w-100"
            onClick={() => navigate('/photos')}
          >
            View Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
