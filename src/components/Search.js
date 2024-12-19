import React from 'react';

const Search = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Search...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
