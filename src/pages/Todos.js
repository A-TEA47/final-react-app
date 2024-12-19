import React, { useState, useEffect } from 'react';
import { getTodos } from '../services/api';
import { downloadJSON } from '../utils/download';


const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDownload = () => {
    downloadJSON(todos, 'todos.json'); // Use reusable download utility
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Filter todos based on search input and status
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'pending' && !todo.completed);
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Todos</h2>
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search todos..."
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
        <div className="mb-3">
          <button
            className={`btn me-2 ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`btn me-2 ${statusFilter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending
          </button>
          <button
            className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>
        <ul className="list-group">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{todo.title}</span>
              <span
                className={`badge ${todo.completed ? 'bg-success' : 'bg-warning'}`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
