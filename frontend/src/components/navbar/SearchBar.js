import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Ex: food, service, hotel" />
      <input type="text" placeholder="Where" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
