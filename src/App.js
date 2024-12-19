import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar Component
import Home from './pages/Home'; // Home Page
import Users from './pages/Users'; // Users List
import UserProfile from './pages/UserProfile'; // User Profile
import Posts from './pages/Posts'; // Posts List
import Comments from './pages/Comments'; // Comments List
import Albums from './pages/Albums'; // Albums List
import Photos from './pages/Photos'; // Photos Gallery
import Todos from './pages/Todos'; // Todos List
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/users" element={<Users />} /> {/* Users List */}
          <Route path="/users/:id" element={<UserProfile />} /> {/* User Profile */}
          <Route path="/posts" element={<Posts />} /> {/* Posts */}
          <Route path="/comments" element={<Comments />} /> {/* Comments */}
          <Route path="/albums" element={<Albums />} /> {/* Albums */}
          <Route path="/photos" element={<Photos />} /> {/* Photos */}
          <Route path="/todos" element={<Todos />} /> {/* Todos */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/register" element={<Register />} /> {/* Register Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
